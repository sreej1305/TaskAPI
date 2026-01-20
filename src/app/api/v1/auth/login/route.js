import sql from "@/app/api/utils/sql";
import { verify } from "argon2";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find user
    const users = await sql`
      SELECT id, email, password_hash, full_name, role, created_at
      FROM users
      WHERE email = ${email.toLowerCase()}
    `;

    if (users.length === 0) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await verify(user.password_hash, password);

    if (!isValidPassword) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Generate JWT token (simplified - in production use proper JWT library)
    const token = Buffer.from(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64");

    return Response.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          created_at: user.created_at,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
