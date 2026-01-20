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

// GET /api/v1/admin/users - List all users (Admin only)
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

    // Check if user is admin
    if (tokenData.role !== "admin") {
      return Response.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    const users = await sql`
      SELECT id, email, full_name, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;

    // Get task count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const taskCount = await sql`
          SELECT COUNT(*) as count FROM tasks WHERE user_id = ${user.id}
        `;
        return {
          ...user,
          task_count: parseInt(taskCount[0].count),
        };
      }),
    );

    return Response.json(
      {
        users: usersWithStats,
        count: usersWithStats.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get users error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
