export async function deleteAdminProduct(id: string) {
  const response = await fetch(`/api/admin/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression du produit avec l'ID ${id}`);
  }

  return await response.json();
}
