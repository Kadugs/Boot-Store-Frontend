export default function ItemCart({ cartInfos }) {
  const { productCode, quantity } = cartInfos;

  return (
    <tr>
      <td>
        <img src="https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" />
        <p>oi</p>
      </td>
      <td>1</td>
      <td>R$300</td>
    </tr>
  );
}
