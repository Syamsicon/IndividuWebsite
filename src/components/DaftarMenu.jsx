import KartuMenu from "./KartuMenu";

function DaftarMenu({ menuData, daftarBahan }) {
  if (menuData.length === 0) {
    return <p className="kosong">Belum ada data menu.</p>;
  }

  return (
    <div className="daftar-menu">
      {menuData.map((menu) => (
        <KartuMenu key={menu.id} menu={menu} daftarBahan={daftarBahan} />
      ))}
    </div>
  );
}

export default DaftarMenu;
