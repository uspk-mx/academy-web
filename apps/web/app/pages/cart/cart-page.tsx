import { Cart } from "ui/components/cart/cart";
import { MeDocument } from "gql-generated/gql/graphql";
import type { MeQuery } from "gql-generated/gql/graphql";
import type { Cart as CartType } from "gql-generated/gql/graphql";
import { useQuery } from "urql";

const CartPage = () => {
  const [{ data, fetching }] = useQuery<MeQuery>({ query: MeDocument });

  if (fetching) return <div>loading...</div>;
  return <Cart cartData={data?.me?.carts as CartType} />;
};

export default CartPage;
