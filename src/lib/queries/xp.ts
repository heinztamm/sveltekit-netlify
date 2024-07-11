export const XpQuery = `{transaction(where:{type:{_eq:"xp"}, object:{type:{_eq:"project"}}}){
    amount
    object{
      name
    }
}
   transaction_aggregate(where:{type:{_eq:"xp"}, object:{type:{_eq:"project"}}}){
  
  aggregate{
    sum{
      amount
    }
  }
}
}`