import sql from "@/app/api/utils/sql";

// Helper function to verify token
function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

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

    // Fetch user data
    const users = await sql`
      SELECT id, email, full_name, role, created_at
      FROM users
      WHERE id = ${tokenData.userId}
    `;

    if (users.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(
      {
        user: users[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get user error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
