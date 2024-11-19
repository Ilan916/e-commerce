import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    // Vérifie les données reçues
    const body = await req.json();
    console.log("Données reçues :", body);

    const { firstname, lastname, email, password, dateOfBirth, phoneNumber, address } = body;

    if (!firstname || !lastname || !email || !password) {
      console.error("Champs obligatoires manquants !");
      return new Response(
        JSON.stringify({ error: "Champs obligatoires manquants." }),
        { status: 400 }
      );
    }

    // Hache le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Mot de passe haché :", hashedPassword);

    // Créer un utilisateur
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phoneNumber,
        address,
      },
    });

    console.log("Utilisateur créé avec succès :", user);

    return new Response(JSON.stringify({ success: true, user }), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
