export default function SearchProduct(props: any) {
  return (
    <form
      onSubmit={props.searchProduct}
    >
      <legend>Search for a product and add its quantity</legend>

      <div className="campo">
        <label>Productos:</label>
        <input
          type="text"
          placeholder="Product Name"
          name="productos"
          onChange={props.readSearchData}
        />
      </div>

      <input
        type="submit"
        className="btn btn-azul btn-block"
        value="Search Product"
      />
    </form>
  );
}
