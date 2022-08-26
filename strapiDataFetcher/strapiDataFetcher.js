import { gql } from "@apollo/client";
import ipAdress from "../ipAddress";

export const apiUserDetailFormatter = (userDetail) => {
  let details = userDetail.usersPermissionsUser.data.attributes;
  return {
    email: details.email,
    firstName: details.firstName,
    lastName: details.lastName,
    phoneNo: details.phoneNo,
    url: details.url,
    username: details.username,
    id: userDetail.usersPermissionsUser.data.id,
  };
};
export const apiCartDataFormatter = (CartData) => {
  return CartData?.carts.data.map((x) => {
    return {
      identity: x.attributes.product.data.attributes.Identity,
      price: x.attributes.product.data.attributes.Price,
      quantity: x.attributes.Quantity,
      shipping: x.attributes.product.data.attributes.ShippingPrice,
      size: x.attributes.product.data.attributes.Size,
      uri:
        ipAdress +
        x.attributes.product.data.attributes.Image.data[0].attributes.url,
      description: x.attributes.product.data.attributes.Description,
      id: x.id,
      productId: x.attributes.product.data.id,
      date: x.attributes.product.data.attributes.createdAt,
    };
  });
};
const getColors = (colors) => {
  return colors.map((x) => {
    return x.color;
  });
};

const getImageUrls = (urls) => {
  return urls.map((x) => {
    return ipAdress + x.attributes.url;
  });
};

export const apiCatagoryProductsDataFormatter = (CategoryData) => {
  return CategoryData.categories.data[0].attributes.products.data.map((x) => {
    return {
      description: x.attributes.Description,
      identity: x.attributes.Identity,
      brandNew: x.attributes.BrandNew,
      rating: x.attributes.Rating,
      reviews: x.attributes.Reviews,
      orgPrice: x.attributes.Price,
      country: x.attributes.Country,
      watchers: x.attributes.Watcher,
      sponsored: x.attributes.Sponsered,
      discPrice: x.attributes.DiscountedPrice,
      size: x.attributes.Size,
      stock: x.attributes.Stock,
      color: getColors(x.attributes.Color),
      shippingPrice: x.attributes.ShippingPrice,
      listedDate: "October 13, 2012 11:13:00",
      seller: x.attributes.Seller,
      uri: getImageUrls(x.attributes.Image.data),
      productId: x.id,
    };
  });
};

export const apiWishListFormatter = (wishListData) => {
  return wishListData.wishLists.data.map((x) => {
    return {
      identity: x.attributes.product.data.attributes.Identity,
      orgPrice: x.attributes.product.data.attributes.Price,
      shipping: x.attributes.product.data.attributes.ShippingPrice,
      discPrice: x.attributes.product.data.attributes.DiscountedPrice,
      uri:
        ipAdress +
        x.attributes.product.data.attributes.Image.data[0].attributes.url,
      description: x.attributes.product.data.attributes.Description,
      id: x.id,
      productId: x.attributes.product.data.id,
      seller: x.attributes.product.data.attributes.Seller,
    };
  });
};

export const apiSaveForLaterFormatter = (SaveForLaterData) => {
  // console.log("adf", SaveForLaterData);
  return SaveForLaterData?.saveForLaters.data.map((x) => {
    return {
      identity: x.attributes.product.data.attributes.Identity,
      price: x.attributes.product.data.attributes.Price,
      quantity: x.attributes.Quantity,
      shipping: x.attributes.product.data.attributes.ShippingPrice,
      size: x.attributes.product.data.attributes.Size,
      uri:
        ipAdress +
        x.attributes.product.data.attributes.Image.data[0].attributes.url,
      description: x.attributes.product.data.attributes.Description,
      id: x.id,
      productId: x.attributes.product.data.id,
    };
  });
};

export const FetchCartProducts = gql`
  query GetCart($userId: ID!) {
    carts(filters: { users_permissions_user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          Quantity
          product {
            data {
              id
              attributes {
                Description
                Identity
                Price
                ShippingPrice
                createdAt
                Seller
                Size
                Image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FetchSaveForLaterProducts = gql`
  query GetSaveForLater($userId: ID!) {
    saveForLaters(
      filters: { users_permissions_user: { id: { eq: $userId } } }
    ) {
      data {
        id
        attributes {
          Quantity
          product {
            data {
              id
              attributes {
                Identity
                Size
                Price
                Seller
                ShippingPrice
                Description
                Image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FetchWishListProducts = gql`
  query GetSaveForLater($userId: ID!) {
    wishLists(filters: { users_permissions_user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                Identity
                Price
                Seller
                ShippingPrice
                Description
                DiscountedPrice
                Image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FetchCategoryProducts = gql`
  query GetSneakers($CatName: String!) {
    categories(filters: { name: { eq: $CatName } }) {
      data {
        id
        attributes {
          products {
            data {
              id
              attributes {
                Description
                Size
                Price
                ShippingPrice
                Identity
                DiscountedPrice
                Stock
                BrandNew
                Reviews
                Identity
                Rating
                Watcher
                Sponsered
                Seller
                Country
                Color {
                  color
                }
                Image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FetchPurchaseProducts = gql`
  query GetPurchases($userId: ID!) {
    purchases(filters: { users_permissions_user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          createdAt
          product {
            data {
              id
              attributes {
                Description
                Price
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DeleteDuplicateFromSaveForLater = gql`
  mutation DELETESAVEFORLATER($id: ID!) {
    deleteSaveForLater(id: $id) {
      data {
        id
      }
    }
  }
`;

export const DeleteFromSaveForLater = gql`
  mutation DELETESAVEFORLATER($id: ID!) {
    deleteSaveForLater(id: $id) {
      data {
        id
      }
    }
  }
`;
export const DeleteCart = gql`
  mutation DELETECART($id: ID!) {
    deleteCart(id: $id) {
      data {
        id
      }
    }
  }
`;

export const DeleteWishList = gql`
  mutation DELETEWISHLIST($id: ID!) {
    deleteWishList(id: $id) {
      data {
        id
      }
    }
  }
`;

export const CreateSaveForLater = gql`
  mutation CREATESAVEFORLATER($userId: ID!, $productId: ID!, $quantity: Int!) {
    createSaveForLater(
      data: {
        users_permissions_user: $userId
        product: $productId
        Quantity: $quantity
      }
    ) {
      data {
        id
      }
    }
  }
`;

export const CreateCart = gql`
  mutation CREATECART($userId: ID!, $productId: ID!, $quantity: Int!) {
    createCart(
      data: {
        users_permissions_user: $userId
        product: $productId
        Quantity: $quantity
      }
    ) {
      data {
        id
      }
    }
  }
`;

export const CreatePurchases = gql`
  mutation CreatePurchase($userId: ID!, $productId: ID!) {
    createPurchase(
      data: { users_permissions_user: $userId, product: $productId }
    ) {
      data {
        id
      }
    }
  }
`;

export const CreateWishList = gql`
  mutation CREATEWISHLIST($userId: ID!, $productId: ID!) {
    createWishList(
      data: { users_permissions_user: $userId, product: $productId }
    ) {
      data {
        id
      }
    }
  }
`;

export const GetUserDetail = gql`
  query GetUser($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          firstName
          lastName
          phoneNo
          email
          url
          username
        }
      }
    }
  }
`;

export const LogIn = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;

export const createUser = gql`
  mutation DoRegistration(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $url: String!
    $userName: String!
    $phoneNo: String!
    $confirmed: Boolean!
  ) {
    createUsersPermissionsUser(
      data: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        url: $url
        username: $userName
        phoneNo: $phoneNo
        confirmed: $confirmed
      }
    ) {
      data {
        id
        attributes {
          username
          email
          phoneNo
          firstName
          lastName
          url
          confirmed
        }
      }
    }
  }
`;

// import { gql } from "@apollo/client";
// import ipAdress from "../ipAddress";

// export const apiUserDetailFormatter = (userDetail) => {
//   let details = userDetail.usersPermissionsUser.data.attributes;
//   return {
//     email: details.email,
//     firstName: details.firstName,
//     lastName: details.lastName,
//     phoneNo: details.phoneNo,
//     url: details.url,
//     username: details.username,
//     id: userDetail.usersPermissionsUser.data.id,
//   };
// };
// export const apiCartDataFormatter = (CartData) => {
//   return CartData?.carts.data.map((x) => {
//     return {
//       identity: x.attributes.product.data.attributes.Identity,
//       price: x.attributes.product.data.attributes.Price,
//       quantity: x.attributes.Quantity,
//       shipping: x.attributes.product.data.attributes.ShippingPrice,
//       size: x.attributes.product.data.attributes.Size,
//       uri:
//         ipAdress +
//         x.attributes.product.data.attributes.Image.data[0].attributes.url,
//       description: x.attributes.product.data.attributes.Description,
//       id: x.id,
//       productId: x.attributes.product.data.id,
//       date: x.attributes.product.data.attributes.createdAt,
//     };
//   });
// };
// const getColors = (colors) => {
//   return colors.map((x) => {
//     return x.Color;
//   });
// };

// const getImageUrls = (urls) => {
//   return urls.map((x) => {
//     return ipAdress + x.attributes.url;
//   });
// };

// export const apiCatagoryProductsDataFormatter = (CategoryData) => {
//   return CategoryData.categories.data[0].attributes.products.data.map((x) => {
//     return {
//       description: x.attributes.Description,
//       identity: x.attributes.Identity,
//       brandNew: x.attributes.BrandNew,
//       rating: x.attributes.Rating,
//       reviews: x.attributes.Reviews,
//       orgPrice: x.attributes.Price,
//       country: x.attributes.Country,
//       watchers: x.attributes.Watcher,
//       sponsored: x.attributes.Sponsered,
//       discPrice: x.attributes.DiscountedPrice,
//       size: x.attributes.Size,
//       stock: x.attributes.Stock,
//       color: getColors(x.attributes.Color_LIst),
//       shippingPrice: x.attributes.ShippingPrice,
//       listedDate: "October 13, 2012 11:13:00",
//       seller: x.attributes.Seller,
//       uri: getImageUrls(x.attributes.Image.data),
//       productId: x.id,
//     };
//   });
// };

// export const apiWishListFormatter = (wishListData) => {
//   return wishListData.wishLists.data.map((x) => {
//     return {
//       identity: x.attributes.product.data.attributes.Identity,
//       orgPrice: x.attributes.product.data.attributes.Price,
//       shipping: x.attributes.product.data.attributes.ShippingPrice,
//       discPrice: x.attributes.product.data.attributes.DiscountedPrice,
//       uri:
//         ipAdress +
//         x.attributes.product.data.attributes.Image.data[0].attributes.url,
//       description: x.attributes.product.data.attributes.Description,
//       id: x.id,
//       productId: x.attributes.product.data.id,
//       seller: x.attributes.product.data.attributes.Seller,
//     };
//   });
// };

// export const apiSaveForLaterFormatter = (SaveForLaterData) => {
//   // console.log("adf", SaveForLaterData);
//   return SaveForLaterData?.saveForLaters.data.map((x) => {
//     return {
//       identity: x.attributes.product.data.attributes.Identity,
//       price: x.attributes.product.data.attributes.Price,
//       quantity: x.attributes.Quantity,
//       shipping: x.attributes.product.data.attributes.ShippingPrice,
//       size: x.attributes.product.data.attributes.Size,
//       uri:
//         ipAdress +
//         x.attributes.product.data.attributes.Image.data[0].attributes.url,
//       description: x.attributes.product.data.attributes.Description,
//       id: x.id,
//       productId: x.attributes.product.data.id,
//     };
//   });
// };

// export const FetchCartProducts = gql`
//   query GetCart($userId: ID) {
//     carts(filters: { user: { id: { eq: $userId } } }) {
//       data {
//         id
//         attributes {
//           Quantity
//           product {
//             data {
//               id
//               attributes {
//                 Description
//                 Identity
//                 Price
//                 ShippingPrice
//                 createdAt
//                 Seller
//                 Size
//                 Image {
//                   data {
//                     id
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const FetchSaveForLaterProducts = gql`
//   query GetSaveForLater($userId: ID!) {
//     saveForLaters(
//       filters: { users_permissions_user: { id: { eq: $userId } } }
//     ) {
//       data {
//         id
//         attributes {
//           Quantity
//           product {
//             data {
//               id
//               attributes {
//                 Identity
//                 Size
//                 Price
//                 Seller
//                 ShippingPrice
//                 Description
//                 Quantity
//                 Image {
//                   data {
//                     id
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const FetchWishListProducts = gql`
//   query GetSaveForLater($userId: ID!) {
//     wishLists(filters: { user: { id: { eq: $userId } } }) {
//       data {
//         id
//         attributes {
//           product {
//             data {
//               id
//               attributes {
//                 Identity
//                 Price
//                 Seller
//                 ShippingPrice
//                 Description
//                 DiscountedPrice
//                 Image {
//                   data {
//                     id
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const FetchCategoryProducts = gql`
//   query GetSneakers($CatName: String!) {
//     categories(filters: { name: { eq: $CatName } }) {
//       data {
//         id
//         attributes {
//           products {
//             data {
//               id
//               attributes {
//                 Description
//                 Size
//                 Price
//                 ShippingPrice
//                 Identity
//                 DiscountedPrice
//                 Stock
//                 BrandNew
//                 Reviews
//                 Watcher
//                 Identity
//                 Rating
//                 Sponsered
//                 Seller
//                 Country
//                 Quantity
//                 Color_LIst {
//                   Color
//                 }
//                 Image {
//                   data {
//                     id
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const FetchPurchaseProducts = gql`
//   query GetPurchases($userId: ID!) {
//     purchases(filters: { users_permissions_user: { id: { eq: $userId } } }) {
//       data {
//         id
//         attributes {
//           createdAt
//           product {
//             data {
//               id
//               attributes {
//                 Description
//                 Price
//                 Image {
//                   data {
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const DeleteDuplicateFromSaveForLater = gql`
//   mutation DELETESAVEFORLATER($id: ID!) {
//     deleteSaveForLater(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const DeleteFromSaveForLater = gql`
//   mutation DELETESAVEFORLATER($id: ID!) {
//     deleteSaveForLater(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `;
// export const DeleteCart = gql`
//   mutation DELETECART($id: ID!) {
//     deleteCart(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const DeleteWishList = gql`
//   mutation DELETEWISHLIST($id: ID!) {
//     deleteWishList(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const CreateSaveForLater = gql`
//   mutation CREATECART($userId: ID!, $productId: ID!, $quantity: Int!) {
//     createSaveForLater(
//       data: {
//         users_permissions_user: $userId
//         product: $productId
//         Quantity: $quantity
//       }
//     ) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const CreateCart = gql`
//   mutation CREATECART($userId: ID!, $productId: ID!, $quantity: Int!) {
//     createCart(
//       data: { user: $userId, product: $productId, Quantity: $quantity }
//     ) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const CreatePurchases = gql`
//   mutation CreatePurchase($userId: ID!, $productId: ID!) {
//     createPurchase(
//       data: { users_permissions_user: $userId, product: $productId }
//     ) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const CreateWishList = gql`
//   mutation CREATEWISHLIST($userId: ID!, $productId: ID!) {
//     createWishList(data: { user: $userId, product: $productId }) {
//       data {
//         id
//       }
//     }
//   }
// `;

// export const GetUserDetail = gql`
//   query GetUser($id: ID) {
//     usersPermissionsUser(id: $id) {
//       data {
//         id
//         attributes {
//           firstName
//           lastName
//           phoneNo
//           email
//           url
//           username
//         }
//       }
//     }
//   }
// `;

// export const LogIn = gql`
//   mutation Login($identifier: String!, $password: String!) {
//     login(input: { identifier: $identifier, password: $password }) {
//       jwt
//       user {
//         id
//         email
//         username
//       }
//     }
//   }
// `;

// export const createUser = gql`
//   mutation DoRegistration(
//     $email: String!
//     $password: String!
//     $firstName: String!
//     $lastName: String!
//     $url: String!
//     $userName: String!
//     $phoneNo: String!
//     $confirmed: Boolean!
//   ) {
//     createUsersPermissionsUser(
//       data: {
//         email: $email
//         password: $password
//         firstName: $firstName
//         lastName: $lastName
//         url: $url
//         username: $userName
//         phoneNo: $phoneNo
//         confirmed: $confirmed
//       }
//     ) {
//       data {
//         id
//         attributes {
//           username
//           email
//           phoneNo
//           firstName
//           lastName
//           url
//           confirmed
//         }
//       }
//     }
//   }
// `;
