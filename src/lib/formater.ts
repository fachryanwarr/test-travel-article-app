export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dd = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const yyyy = date.getUTCFullYear();

  return `${dd} ${month} ${yyyy}`;
}