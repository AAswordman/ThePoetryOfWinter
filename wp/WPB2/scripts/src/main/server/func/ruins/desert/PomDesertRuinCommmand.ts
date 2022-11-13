export enum MAIN {
    TP,
    BLAST,
    EFFECT,
    DAMAGE,
    HEALTH_ADD,
    HEALTH_REMOVE,
    EXECUTE
}
export enum TARGET {
    SELF,
    X_ADD_4,
    X_ADD_8,
    X_ADD_16,
    X_ADD_32,
    X_REMOVE_4,
    X_REMOVE_8,
    X_REMOVE_16,
    X_REMOVE_32,
    Z_ADD_4,
    Z_ADD_8,
    Z_ADD_16,
    Z_ADD_32,
    Z_REMOVE_4,
    Z_REMOVE_8,
    Z_REMOVE_16,
    Z_REMOVE_32,
    Y_ADD_4,
    Y_ADD_8,
    Y_ADD_16,
    Y_ADD_32,
    Y_REMOVE_4,
    Y_REMOVE_8,
    Y_REMOVE_16,
    Y_REMOVE_32,

    GUARD_POS
}
export enum EFFECT {
    WEAKNESS,
    STRENGTH,
    BLIND,
    SPEED,
    DEFENSE,
    WITHER
}
export enum VALUE {
    VALUE_1,
    VALUE_2,
    VALUE_4,
    VALUE_8,
    VALUE_16,
    VALUE_32,
    VALUE_3,
    VALUE_5,
    VALUE_10,
    VALUE_64
}