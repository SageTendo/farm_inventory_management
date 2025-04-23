function doSearch() {
  alert("Hello")
}

export function ProductsOverview() {
  return (
    <>
      <div className="container">
        <div className="searchbar">
          <input
            className="searchbar-input"
            placeholder="Search products..."
          />
          <button className="searchbar-button"
                  onClick={doSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}