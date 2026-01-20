import sql from "@/app/api/utils/sql";

// Helper function to verify token
function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    if (decoded.exp < Date.now()) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

// GET /api/v1/tasks/[id] - Get a single task
export async function GET(request, { params }) {
  try {
    const authHeader = request.headers.get("Authorization");
    const tokenData = verifyToken(authHeader);

    if (!tokenData) {
      return Response.json(
        { error: "Unauthorized - Invalid or expired token" },
        { status: 401 },
      );
    }

    const { id } = params;

    const tasks = await sql`
      SELECT * FROM tasks
      WHERE id = ${id} AND user_id = ${tokenData.userId}
    `;

    if (tasks.length === 0) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    return Response.json(
      {
        task: tasks[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get task error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/v1/tasks/[id] - Update a task
export async function PUT(request, { params }) {
  try {
    const authHeader = request.headers.get("Authorization");
    const tokenData = verifyToken(authHeader);

    if (!tokenData) {
      return Response.json(
        { error: "Unauthorized - Invalid or expired token" },
        { status: 401 },
      );
    }

    const { id } = params;
    const body = await request.json();
    const { title, description, status, priority, due_date } = body;

    // Check if task exists and belongs to user
    const existingTasks = await sql`
      SELECT * FROM tasks
      WHERE id = ${id} AND user_id = ${tokenData.userId}
    `;

    if (existingTasks.length === 0) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    // Validate status if provided
    const validStatuses = ["pending", "in_progress", "completed"];
    if (status && !validStatuses.includes(status)) {
      return Response.json(
        {
          error: "Invalid status. Must be: pending, in_progress, or completed",
        },
        { status: 400 },
      );
    }

    // Validate priority if provided
    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
      return Response.json(
        { error: "Invalid priority. Must be: low, medium, or high" },
        { status: 400 },
      );
    }

    // Build dynamic update query
    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (title !== undefined && title.trim().length > 0) {
      paramCount++;
      setClauses.push(`title = $${paramCount}`);
      values.push(title.trim());
    }

    if (description !== undefined) {
      paramCount++;
      setClauses.push(`description = $${paramCount}`);
      values.push(description);
    }

    if (status !== undefined) {
      paramCount++;
      setClauses.push(`status = $${paramCount}`);
      values.push(status);
    }

    if (priority !== undefined) {
      paramCount++;
      setClauses.push(`priority = $${paramCount}`);
      values.push(priority);
    }

    if (due_date !== undefined) {
      paramCount++;
      setClauses.push(`due_date = $${paramCount}`);
      values.push(due_date);
    }

    if (setClauses.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    // Add updated_at
    paramCount++;
    setClauses.push(`updated_at = $${paramCount}`);
    values.push(new Date().toISOString());

    // Add WHERE clause parameters
    paramCount++;
    values.push(id);
    const idParam = paramCount;

    paramCount++;
    values.push(tokenData.userId);
    const userIdParam = paramCount;

    const query = `
      UPDATE tasks
      SET ${setClauses.join(", ")}
      WHERE id = $${idParam} AND user_id = $${userIdParam}
      RETURNING *
    `;

    const result = await sql(query, values);

    return Response.json(
      {
        message: "Task updated successfully",
        task: result[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update task error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/v1/tasks/[id] - Delete a task
export async function DELETE(request, { params }) {
  try {
    const authHeader = request.headers.get("Authorization");
    const tokenData = verifyToken(authHeader);

    if (!tokenData) {
      return Response.json(
        { error: "Unauthorized - Invalid or expired token" },
        { status: 401 },
      );
    }

    const { id } = params;

    // Check if task exists and belongs to user
    const existingTasks = await sql`
      SELECT * FROM tasks
      WHERE id = ${id} AND user_id = ${tokenData.userId}
    `;

    if (existingTasks.length === 0) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    // Delete task
    await sql`
      DELETE FROM tasks
      WHERE id = ${id} AND user_id = ${tokenData.userId}
    `;

    return Response.json(
      {
        message: "Task deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete task error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
