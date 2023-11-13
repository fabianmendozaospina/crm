export default function Header(props: { showOptions: boolean }) {
  return (
    <header class="barra">
      <div class="contenedor">
        <div class="contenido-barra">
          <h1>Customer Relationship Management - CRM</h1>
          {props.showOptions &&
            (
              <a
                href="/api/logout"
                class="btn btn-rojo"
              >
                <i class="far fa-times-circle"></i>
                Close Session
              </a>
            )}
        </div>
      </div>
    </header>
  );
}
