export interface WeaponNames {
    giveMeMyHumanName(weapon: string): string;
}
export class EfayaV2Weapons implements WeaponNames {
    public giveMeMyHumanName(weapon: string): string {
        let res = "";
        if (weapon.startsWith("m16_")) {
            res += "M16A4";
        } else if (weapon.startsWith("m4_")) {
            res += "Scar-H";
        } else if (weapon.startsWith("colt45_")) {
            res += "Colt M1911";
        } else if (weapon.startsWith("concussion_")) {
            res += "Grenade paralysante";
        } else if (weapon.startsWith("frag_")) {
            res += "Grenade Frag";
        } else if (weapon.startsWith("g36c_")) {
            res += "Commando";
        } else if (weapon.startsWith("mp44_")) {
            res += "Mosin Nagant";
        } else if (weapon.startsWith("ak47_")) {
            res += "AK-47";
        } else if (weapon.startsWith("g3_")) {
            res += "G3";
        } else if (weapon.startsWith("m14_")) {
            res += "M14";
        } else if (weapon.startsWith("usp_")) {
            res += "USP .45";
        } else if (weapon.startsWith("beretta_")) {
            res += "Beretta M9";
        } else if (weapon.startsWith("deserteagle_")) {
            res += "Desert Eagle";
        } else if (weapon.startsWith("deserteaglegold_")) {
            res += "Ballistic knife";
        } else if (weapon.startsWith("rpd_")) {
            res += "RPD";
        } else if (weapon.startsWith("saw_")) {
            res += "M249 SAW";
        } else if (weapon.startsWith("m60e4_")) {
            res += "M60E4";
        } else if (weapon.startsWith("m1014_")) {
            res += "M1014 (Benelli M4 Super 90)";
        } else if (weapon.startsWith("winchester1200_")) {
            res += "Winchester W1200 Defender";
        } else if (weapon.startsWith("m40a3_")) {
            res += "M40A3";
        } else if (weapon.startsWith("m21_")) {
            res += "M21";
        } else if (weapon.startsWith("remington700_")) {
            res += "Remington R700";
        } else if (weapon.startsWith("barrett_")) {
            res += "Barrett .50cal";
        } else if (weapon.startsWith("dragunov_")) {
            res += "Dragunov SVD";
        } else if (weapon.startsWith("rpg_")) {
            res += "RPG";
        } else if (weapon.startsWith("c4_")) {
            res += "C4";
        } else if (weapon.startsWith("mp5_")) {
            res += "Heckler & Koch MP5";
        } else if (weapon.startsWith("skorpion_")) {
            res += "Skorpion vz. 61";
        } else if (weapon.startsWith("uzi_")) {
            res += "Mini-Uzi";
        } else if (weapon.startsWith("ak74u_")) {
            res += "AK-74u";
        } else if (weapon.startsWith("p90_")) {
            res += "Fabrique Nationale P90";
        } else {
            res += weapon;
        }
        if (weapon.indexOf("_silencer") > -1) {
            res += " silenced";
        } else if (weapon.indexOf("_acog") > -1) {
            res += " ACOG";
        } else if (weapon.indexOf("_reflex") > -1) {
            res += " Reflex";
        }
        return res;
    }
}


export class IMMWeapons implements WeaponNames {
    public giveMeMyHumanName(weapon: string): string {
        return weapon;
    }
}

export class EfayaModV1Weapons implements WeaponNames {
    public giveMeMyHumanName(weapon: string): string {
        let res = "";
        if (weapon.startsWith("m16_")) {
            res += "M16A4";
        } else if (weapon.startsWith("ak47_")) {
            res += "AK-12";
        } else if (weapon.startsWith("g3_")) {
            res += "Honey Badger";
        } else if (weapon.startsWith("m4_")) {
            res += "Remington R5";
        } else if (weapon.startsWith("g36c_")) {
            res += "Commando";
        } else if (weapon.startsWith("m14_")) {
            res += "Famas";
        } else if (weapon.startsWith("mp44_")) {
            res += "MK14";
        } else if (weapon.startsWith("colt45_")) {
            res += "RK5";
        } else if (weapon.startsWith("usp_")) {
            res += "Titanfall RE45";
        } else if (weapon.startsWith("beretta_")) {
            res += "M9A1";
        } else if (weapon.startsWith("deserteagle_")) {
            res += "Magnum";
        } else if (weapon.startsWith("deserteaglegold_")) {
            res += "Desert Eagle";
        } else if (weapon.startsWith("rpd_")) {
            res += "M1 Garand";
        } else if (weapon.startsWith("saw_")) {
            res += "Mosin Nagant";
        } else if (weapon.startsWith("m60e4_")) {
            res += "Kar 98";
        } else if (weapon.startsWith("m1014_")) {
            res += "Brecci";
        } else if (weapon.startsWith("winchester1200_")) {
            res += "M133";
        } else if (weapon.startsWith("m40a3_")) {
            res += "BF3 L96";
        } else if (weapon.startsWith("remington700_")) {
            res += "Ballista";
        } else if (weapon.startsWith("dragunov_")) {
            res += "AWP";
        } else if (weapon.startsWith("claymore_")) {
            res += "Crossbow";
        } else if (weapon.startsWith("rpg_")) {
            res += "Explosive crossbow";
        } else if (weapon.startsWith("binocular_")) {
            res += "Karambit";
        } else if (weapon.startsWith("concussion_")) {
            res += "Grenade paralysante";
        } else if (weapon.startsWith("frag_")) {
            res += "Grenade Frag";
        } else if (weapon.startsWith("hind_")) {
            res += "Tec-9";
        } else if (weapon.startsWith("m21_")) {
            res += "M21";
        } else if (weapon.startsWith("barrett_")) {
            res += "Barrett .50cal";
        } else if (weapon.startsWith("mp5_")) {
            res += "Heckler & Koch MP5";
        } else if (weapon.startsWith("skorpion_")) {
            res += "Skorpion vz. 61";
        } else if (weapon.startsWith("uzi_")) {
            res += "Mini-Uzi";
        } else if (weapon.startsWith("ak74u_")) {
            res += "AK-74u";
        } else if (weapon.startsWith("p90_")) {
            res += "Fabrique Nationale P90";
        } else {
            res += weapon;
        }
        if (weapon.indexOf("_silencer") > -1) {
            res += " silenced";
        } else if (weapon.indexOf("_acog") > -1) {
            res += " ACOG";
        } else if (weapon.indexOf("_reflex") > -1) {
            res += " Reflex";
        }
        return res;
    }
}
