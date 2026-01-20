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

// GET /api/v1/tasks - List all tasks for the authenticated user
export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const tokenData = verifyToken(authHeader);

    if (!tokenData) {
      return Response.json(
        { error: "Unauthorized - Invalid or expired token" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");

    let query = `SELECT * FROM tasks WHERE user_id = $1`;
    const params = [tokenData.userId];
    let paramCount = 1;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (priority) {
      paramCount++;
      query += ` AND priority = $${paramCount}`;
      params.push(priority);
    }

    query += ` ORDER BY created_at DESC`;

    const tasks = await sql(query, params);

    return Response.json(
      {
        tasks,
        count: tasks.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get tasks error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/v1/tasks - Create a new task
export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const tokenData = verifyToken(authHeader);

    if (!tokenData) {
      return Response.json(
        { error: "Unauthorized - Invalid or expired token" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { title, description, status, priority, due_date } = body;

    // Validation
    if (!title || title.trim().length === 0) {
      return Response.json({ error: "Title is required" }, { status: 400 });
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

    // Create task
    const result = await sql`
      INSERT INTO tasks (user_id, title, description, status, priority, due_date)
      VALUES (
        ${tokenData.userId},
        ${title.trim()},
        ${description || null},
        ${status || "pending"},
        ${priority || "medium"},
        ${due_date || null}
      )
      RETURNING *
    `;

    return Response.json(
      {
        message: "Task created successfully",
        task: result[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create task error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
