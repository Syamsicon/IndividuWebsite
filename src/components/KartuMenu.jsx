import { costPerCup, formatRupiah } from "../utils/kalkulasi";

function KartuMenu({ menu, daftarBahan }) {
  const cost = costPerCup(menu, daftarBahan);

  return (
    <div className="kartu-menu">
      <h3>{menu.nama}</h3>
      {menu.yield > 1 && (
        <p className="menu-batch">Per batch jadi {menu.yield} cup</p>
      )}
      <ul>
        {menu.bahan.map((item, idx) => {
          const bahan = daftarBahan.find((b) => b.id === item.bahanId);
          return (
            <li key={idx}>
              {item.qty}
              {bahan ? bahan.satuan : ""} {bahan ? bahan.nama : item.bahanId}
            </li>
          );
        })}
      </ul>
      <p className="menu-cost">Cost: {formatRupiah(cost)}/cup</p>
    </div>
  );
}

export default KartuMenu;
