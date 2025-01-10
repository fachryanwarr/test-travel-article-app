export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

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

  const day = days[date.getUTCDay()];
  const dd = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const yyyy = date.getUTCFullYear();

  return `${day}, ${dd} ${month} ${yyyy}`;
}