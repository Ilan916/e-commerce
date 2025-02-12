export async function createAdminProduct(productData: any) {
  try {
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'ajout du produit");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout du produit :", error);
    throw error;
  }
}
