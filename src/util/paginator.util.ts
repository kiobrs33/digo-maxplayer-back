export class PaginatorUtil {
  /**
   * Calcula la paginación en función de los parámetros proporcionados.
   * @param page - Número de página actual.
   * @param take - Cantidad de elementos por página.
   * @param totalItems - Número total de elementos.
   * @returns Un objeto con la información de la paginación.
   */
  public static getPagination(page: number, take: number, totalItems: number) {
    const currentPage = Number(page) || 1;
    const itemsPerPage = Number(take) || 5;
    const offset = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      currentPage, // Página actual.
      itemsPerPage, // Número de elementos por página.
      offset, // Número de elementos a saltar en la consulta.
      totalPages, // Total de páginas disponibles.
    };
  }
}
