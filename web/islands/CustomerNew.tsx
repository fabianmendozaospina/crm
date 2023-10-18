export default function CustomerNew() {
  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">New Customer</h1>
      <form>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input type="text" placeholder="Customer name" name="name" />
        </div>

        <div class="campo">
          <label>Last name:</label>
          <input type="text" placeholder="Customer last name" name="lastname" />
        </div>

        <div class="campo">
          <label>Company:</label>
          <input type="text" placeholder="Customer company" name="company" />
        </div>

        <div class="campo">
          <label>Email:</label>
          <input type="email" placeholder="Customer email" name="email" />
        </div>

        <div class="campo">
          <label>Phone:</label>
          <input type="email" placeholder="Customer phone" name="phone" />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-azul"
            value="Add Customer"
          />
        </div>
      </form>
    </>
  );
}
