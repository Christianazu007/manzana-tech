import styles from './Politicas.module.css';

function Politicas() {
  return (
    <article className={styles.politicas}>
      <h1>Información legal</h1>

      <section>
        <h2>Políticas de privacidad</h2>
        <p>
          En Manzana Tech usamos tus datos personales (nombre, email y dirección) solo para procesar tus compras,
          enviarte novedades si te suscribiste al newsletter y mejorar nuestro servicio. No compartimos tu
          información con terceros sin tu consentimiento. Podés pedir la modificación o eliminación de tus datos
          escribiendo a hola@manzanatech.com.
        </p>
      </section>

      <section>
        <h2>Términos y condiciones</h2>
        <p>
          Los precios están expresados en pesos argentinos e incluyen IVA. Pueden modificarse sin previo aviso y
          están sujetos a disponibilidad de stock. La compra se confirma una vez acreditado el pago.
        </p>
      </section>

      <section>
        <h2>Propiedad intelectual</h2>
        <p>
          Los textos, diseños e imágenes de este sitio pertenecen a Manzana Tech. Apple, iPhone, iPad, Mac,
          Apple Watch y AirPods son marcas registradas de Apple Inc. Manzana Tech es un revendedor independiente
          y no está afiliado a Apple Inc.
        </p>
      </section>

      <section>
        <h2>Cambios y devoluciones</h2>
        <p>
          Tenés 30 días desde la entrega para cambiar o devolver un producto sin uso y en su caja original.
          Todos los equipos cuentan con garantía oficial de 12 meses.
        </p>
      </section>
    </article>
  );
}

export default Politicas;
