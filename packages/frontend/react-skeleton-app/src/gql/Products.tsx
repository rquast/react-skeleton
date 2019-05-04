import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React from "react";

const GET_PRODUCTS = gql`
    {
        allProducts(count: 5) {
            id
            name
            price
        }
    }
`;

export interface ProductProps {
    onProductSelected: any;
}

export const Products: React.FunctionComponent<ProductProps> = props => {
    const { onProductSelected } = props;
    return (
        <Query query={GET_PRODUCTS}>
            {({loading, error, data}: any) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                    <select name="product" onChange={onProductSelected}>
                        {data.allProducts.map((product: any) => (
                            <option key={product.id} value={product.name}>
                                {product.name} - {product.price}
                            </option>
                        ))}
                    </select>
                );
            }}
        </Query>
    );
};
