export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const Pages_EnPartsFragmentDoc = gql`
  fragment Pages_enParts on Pages_en {
    __typename
    title
    description
    locale
    darkBackground
    body
  }
`;
export const Pages_EsPartsFragmentDoc = gql`
  fragment Pages_esParts on Pages_es {
    __typename
    title
    description
    locale
    darkBackground
    body
  }
`;
export const Pages_EnDocument = gql`
  query pages_en($relativePath: String!) {
    pages_en(relativePath: $relativePath) {
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
      ...Pages_enParts
    }
  }
  ${Pages_EnPartsFragmentDoc}
`;
export const Pages_EnConnectionDocument = gql`
  query pages_enConnection(
    $before: String
    $after: String
    $first: Float
    $last: Float
    $sort: String
    $filter: Pages_enFilter
  ) {
    pages_enConnection(
      before: $before
      after: $after
      first: $first
      last: $last
      sort: $sort
      filter: $filter
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        cursor
        node {
          ... on Document {
            _sys {
              filename
              basename
              hasReferences
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
          ...Pages_enParts
        }
      }
    }
  }
  ${Pages_EnPartsFragmentDoc}
`;
export const Pages_EsDocument = gql`
  query pages_es($relativePath: String!) {
    pages_es(relativePath: $relativePath) {
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
      ...Pages_esParts
    }
  }
  ${Pages_EsPartsFragmentDoc}
`;
export const Pages_EsConnectionDocument = gql`
  query pages_esConnection(
    $before: String
    $after: String
    $first: Float
    $last: Float
    $sort: String
    $filter: Pages_esFilter
  ) {
    pages_esConnection(
      before: $before
      after: $after
      first: $first
      last: $last
      sort: $sort
      filter: $filter
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        cursor
        node {
          ... on Document {
            _sys {
              filename
              basename
              hasReferences
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
          ...Pages_esParts
        }
      }
    }
  }
  ${Pages_EsPartsFragmentDoc}
`;
export function getSdk(requester) {
  return {
    pages_en(variables, options) {
      return requester(Pages_EnDocument, variables, options);
    },
    pages_enConnection(variables, options) {
      return requester(Pages_EnConnectionDocument, variables, options);
    },
    pages_es(variables, options) {
      return requester(Pages_EsDocument, variables, options);
    },
    pages_esConnection(variables, options) {
      return requester(Pages_EsConnectionDocument, variables, options);
    },
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request(
      {
        query: doc,
        variables: vars,
        url,
      },
      options,
    );
    return {
      data: data?.data,
      errors: data?.errors,
      query: doc,
      variables: vars || {},
    };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () =>
  getSdk(
    generateRequester(
      createClient({
        url: "https://content.tinajs.io/2.4/content/e17bde00-9308-484c-bdbd-247c42a25514/github/main",
        queries,
      }),
    ),
  );
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
