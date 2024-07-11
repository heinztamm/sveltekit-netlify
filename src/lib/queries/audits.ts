// export const auditRatioQuery: string = `{user {auditRatio}}`;

export function auditAmount(t: string){
    return `{
        transaction_aggregate(where: { type: { _eq: ${t} } }) {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
      `;
}