function RiwayatRestock({ riwayat }) {
  if (riwayat.length === 0) {
    return <p className="kosong">Belum ada riwayat restock.</p>;
  }

  return (
    <div className="riwayat-restock">
      <h3>Riwayat Restock</h3>
      <ul>
        {riwayat.map((item) => (
          <li key={item.id}>
            <strong>{item.namaBahan}</strong> +{item.qty} {item.satuan}
            <span className="riwayat-waktu"> — {item.waktu}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RiwayatRestock;
