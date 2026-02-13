import Cart from "ui/components/cart/cart";
import { MeDocument } from "gql-generated/generated/bff.sdk";
import type { MeQuery } from "gql-generated/generated/types";
import type { Cart as CartType } from "gql-generated/generated/types";
import { useQuery } from 'urql';

const CartPage = () => {
  const [{ data, fetching }] = useQuery<MeQuery>({ query: MeDocument });

  if (fetching) return <div>loading...</div>
  return <Cart cartData={data?.me?.carts as CartType} />;
  //   <Cart items={data?.me?.carts.items} />
};

export default CartPage;
