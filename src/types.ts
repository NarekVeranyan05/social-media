export type NullableType<T> = T | null


type ObjSubObjectTypes<T> = T extends {[key: string]: infer U} ? U : never //goes through object properties and returns a new type queal to U1 | U2 | U3 ...
export type ActionTypes<T extends {[key: string]: (...any: any[]) => any}> = ReturnType<ObjSubObjectTypes<T>> //typing of all actions returned by action creators