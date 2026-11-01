function Header({ tabAktif, onGantiTab }) {
  const tabs = [
    { key: "bahan", label: "Bahan" },
    { key: "menu", label: "Menu" },
    { key: "restock", label: "Restock Bahan" },
    { key: "inspirasi", label: "Inspirasi Menu"},
  ];

  return (
    <header className="header">
      <h1>BrewIT</h1>
      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={tab.key === tabAktif ? "tab tab-aktif" : "tab"}
            onClick={() => onGantiTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
