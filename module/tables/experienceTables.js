export const ExperienceTables = {
    fighter: [
        { min: 0, max: 1999, level: 1, next: 2000, hd: "1d10" },
        { min: 2000, max: 3999, level: 2, next: 4000, hd: "2d10" },
        { min: 4000, max: 7999, level: 3, next: 8000, hd: "3d10" },
        { min: 8000, max: 15999, level: 4, next: 16000, hd: "4d10" },
        { min: 16000, max: 34999, level: 5, next: 35000, hd: "5d10" },
        { min: 35000, max: 69999, level: 6, next: 70000, hd: "6d10" },
        { min: 70000, max: 124999, level: 7, next: 125000, hd: "7d10" },
        { min: 125000, max: 249999, level: 8, next: 250000, hd: "8d10" },
        { min: 250000, max: 499999, level: 9, next: 500000, hd: "9d10" },
        { min: 500000, max: 749999, level: 10, next: 750000, hd: "9d10+3" },
        { min: 750000, max: 999999, level: 11, next: 1000000, hd: "9d10+6" },
        { min: 1000000, max: 1249999, level: 12, next: 1250000, hd: "9d10+9" },
        { min: 1250000, max: 1499999, level: 13, next: 1500000, hd: "9d10+12" },
        { min: 1500000, max: 1749999, level: 14, next: 1750000, hd: "9d10+15" },
        { min: 1750000, max: 1999999, level: 15, next: 2000000, hd: "9d10+18" },
        { min: 2000000, max: 2249999, level: 16, next: 2250000, hd: "9d10+21" },
        { min: 2250000, max: 2499999, level: 17, next: 2500000, hd: "9d10+24" },
        { min: 2500000, max: 2749999, level: 18, next: 2750000, hd: "9d10+27" },
        { min: 2750000, max: 2999999, level: 19, next: 3000000, hd: "9d10+30" },
        { min: 3000000, max: 999999999, level: 20, next: 999999999, hd: "9d10+33" }
    ],
    warrior_specialist: [
        { min: 0, max: 2249, level: 1, next: 2250, hd: "1d10" },
        { min: 2250, max: 4499, level: 2, next: 4500, hd: "2d10" },
        { min: 4500, max: 8999, level: 3, next: 9000, hd: "3d10" },
        { min: 9000, max: 17999, level: 4, next: 18000, hd: "4d10" },
        { min: 18000, max: 35999, level: 5, next: 36000, hd: "5d10" },
        { min: 36000, max: 74999, level: 6, next: 75000, hd: "6d10" },
        { min: 75000, max: 149999, level: 7, next: 150000, hd: "7d10" },
        { min: 150000, max: 299999, level: 8, next: 300000, hd: "8d10" },
        { min: 300000, max: 599999, level: 9, next: 600000, hd: "9d10" },
        { min: 600000, max: 899999, level: 10, next: 900000, hd: "9d10+3" },
        { min: 900000, max: 1199999, level: 11, next: 1200000, hd: "9d10+6" },
        { min: 1200000, max: 1499999, level: 12, next: 1500000, hd: "9d10+9" },
        { min: 1500000, max: 1799999, level: 13, next: 1800000, hd: "9d10+12" },
        { min: 1800000, max: 2099999, level: 14, next: 2100000, hd: "9d10+15" },
        { min: 2100000, max: 2399999, level: 15, next: 2400000, hd: "9d10+18" },
        { min: 2400000, max: 2699999, level: 16, next: 2700000, hd: "9d10+21" },
        { min: 2700000, max: 2999999, level: 17, next: 3000000, hd: "9d10+24" },
        { min: 3000000, max: 3299999, level: 18, next: 3300000, hd: "9d10+27" },
        { min: 3300000, max: 3599999, level: 19, next: 3600000, hd: "9d10+30" },
        { min: 3600000, max: 999999999, level: 20, next: 999999999, hd: "9d10+33" }
    ],
    rogue: [
        { min: 0, max: 1249, level: 1, next: 1250, hd: "1d6" },
        { min: 1250, max: 2499, level: 2, next: 2500, hd: "2d6" },
        { min: 2500, max: 4999, level: 3, next: 5000, hd: "3d6" },
        { min: 5000, max: 9999, level: 4, next: 10000, hd: "4d6" },
        { min: 10000, max: 19999, level: 5, next: 20000, hd: "5d6" },
        { min: 20000, max: 39999, level: 6, next: 40000, hd: "6d6" },
        { min: 40000, max: 69999, level: 7, next: 70000, hd: "7d6" },
        { min: 70000, max: 109999, level: 8, next: 110000, hd: "8d6" },
        { min: 110000, max: 159999, level: 9, next: 160000, hd: "9d6" },
        { min: 160000, max: 219999, level: 10, next: 220000, hd: "10d6" },
        { min: 220000, max: 439999, level: 11, next: 300000, hd: "10d6+2" },
        { min: 440000, max: 659999, level: 12, next: 660000, hd: "10d6+4" },
        { min: 660000, max: 879999, level: 13, next: 880000, hd: "10d6+6" },
        { min: 880000, max: 1099999, level: 14, next: 1100000, hd: "10d6+8" },
        { min: 1100000, max: 1319999, level: 15, next: 1320000, hd: "10d6+10" },
        { min: 1320000, max: 1539999, level: 16, next: 1540000, hd: "10d6+12" },
        { min: 1540000, max: 1759999, level: 17, next: 1760000, hd: "10d6+14" },
        { min: 1760000, max: 1979999, level: 18, next: 1980000, hd: "10d6+16" },
        { min: 1980000, max: 2199999, level: 19, next: 2200000, hd: "10d6+18" },
        { min: 2200000, max: 2419999, level: 20, next: 2420000, hd: "10d6+20" },
        { min: 2420000, max: 999999999, level: 21, next: 999999999, hd: "10d6+22" }
    ],
    priest: [
        { min: 0, max: 1499, level: 1, next: 1500, hd: "1d8" },
        { min: 1500, max: 2999, level: 2, next: 3000, hd: "2d8" },
        { min: 3000, max: 5999, level: 3, next: 6000, hd: "3d8" },
        { min: 6000, max: 12999, level: 4, next: 13000, hd: "4d8" },
        { min: 13000, max: 27499, level: 5, next: 27500, hd: "5d8" },
        { min: 27500, max: 54999, level: 6, next: 55000, hd: "6d8" },
        { min: 55000, max: 109999, level: 7, next: 110000, hd: "7d8" },
        { min: 110000, max: 224999, level: 8, next: 225000, hd: "8d8" },
        { min: 225000, max: 449999, level: 9, next: 450000, hd: "9d8" },
        { min: 450000, max: 674999, level: 10, next: 675000, hd: "9d8+2" },
        { min: 675000, max: 899999, level: 11, next: 900000, hd: "9d8+4" },
        { min: 900000, max: 1124999, level: 12, next: 1125000, hd: "9d8+6" },
        { min: 1125000, max: 1349999, level: 13, next: 1350000, hd: "9d8+8" },
        { min: 1350000, max: 1574999, level: 14, next: 1575000, hd: "9d8+10" },
        { min: 1575000, max: 1799999, level: 15, next: 1800000, hd: "9d8+12" },
        { min: 1800000, max: 2024999, level: 16, next: 2025000, hd: "9d8+14" },
        { min: 2025000, max: 2249999, level: 17, next: 2250000, hd: "9d8+16" },
        { min: 2250000, max: 2474999, level: 18, next: 2475000, hd: "9d8+18" },
        { min: 2475000, max: 2699999, level: 19, next: 2700000, hd: "9d8+20" },
        { min: 2700000, max: 999999999, level: 20, next: 999999999, hd: "9d8+22" }
    ],
    wizard: [
        { min: 0, max: 2499, level: 1, next: 2500, hd: "1d4" },
        { min: 2500, max: 4999, level: 2, next: 5000, hd: "2d4" },
        { min: 5000, max: 9999, level: 3, next: 10000, hd: "3d4" },
        { min: 10000, max: 19999, level: 4, next: 20000, hd: "4d4" },
        { min: 20000, max: 29999, level: 5, next: 40000, hd: "5d4" },
        { min: 40000, max: 59999, level: 6, next: 60000, hd: "6d4" },
        { min: 60000, max: 89999, level: 7, next: 90000, hd: "7d4" },
        { min: 90000, max: 134999, level: 8, next: 135000, hd: "8d4" },
        { min: 135000, max: 249999, level: 9, next: 250000, hd: "9d4" },
        { min: 250000, max: 374999, level: 10, next: 375000, hd: "10d4" },
        { min: 375000, max: 749999, level: 11, next: 750000, hd: "10d4+1" },
        { min: 750000, max: 1124999, level: 12, next: 1125000, hd: "10d4+2" },
        { min: 1125000, max: 1499999, level: 13, next: 1500000, hd: "10d4+3" },
        { min: 1500000, max: 1874999, level: 14, next: 1875000, hd: "10d4+4" },
        { min: 1875000, max: 2249999, level: 15, next: 2250000, hd: "10d4+5" },
        { min: 2250000, max: 2624999, level: 16, next: 2625000, hd: "10d4+6" },
        { min: 2625000, max: 2999999, level: 17, next: 3000000, hd: "10d4+7" },
        { min: 3000000, max: 3374999, level: 18, next: 3375000, hd: "10d4+8" },
        { min: 3375000, max: 3749999, level: 19, next: 3750000, hd: "10d4+9" },
        { min: 3750000, max: 999999999, level: 20, next: 999999999, hd: "10d4+10" }
    ]
}; 

export function retrieveExperienceLevel(className, xpValue) {
    const table = ExperienceTables[className.toLowerCase()];
    if (!table) throw new Error(`Invalid class name: ${className}`);

    const row = table.find(row => xpValue >= row.min && xpValue <= row.max);
    if (!row) throw new Error(`Invalid experience value: ${xpValue}`);

    const { min, max, ...metadata } = row;
    return metadata;
} 