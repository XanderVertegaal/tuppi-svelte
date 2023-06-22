import { FontSet, PrismaClient, SignVariantCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('🍓 Start seeding...');
	await prisma.user.deleteMany({});
	await prisma.logograph.deleteMany({});
	await prisma.determinative.deleteMany({});
	await prisma.characterVariant.deleteMany({});
	await prisma.character.deleteMany({});

	await prisma.character.create({
		data: {
			id: 1,
			unicode: '12038',
			variants: {
				create: {
					horizontal: 1
				}
			},
			syllValues: ['aš'],
			logValues: {
				create: {
					logTranslation: '???',
					logTransliteration: 'AŠ'
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 2,
			unicode: '1212C',
			syllValues: ['ḫal'],
			logValues: {
				create: {
					logTranslation: '???',
					logTransliteration: 'ḪAL'
				}
			},
			variants: {
				create: {
					horizontal: 2
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 3,
			unicode: '1227E',
			logValues: {
				create: {
					logTranslation: '???',
					logTransliteration: 'PÉŠ'
				}
			},
			variants: {
				create: {
					horizontal: 5,
					vertical: 5,
					glossenkeil: 2,
					diagonalAsc: 1,
					diagonalDesc: 1
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 4,
			unicode: '12044',
			syllValues: ['bal', 'pal'],
			logValues: {
				create: [
					{
						logTranslation: 'sacrifice',
						logTransliteration: 'BAL'
					}
				]
			},
			variants: {
				create: {
					horizontal: 3,
					vertical: 1,
					glossenkeil: 3
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 5,
			unicode: '122D3',
			syllValues: ['šir'],
			logValues: {
				create: [
					{
						logTranslation: '???',
						logTransliteration: 'NU11'
					},
					{
						logTranslation: '???',
						logTransliteration: 'SIR12'
					},
					{
						logTranslation: 'testicle',
						logTransliteration: 'ŠIR'
					}
				]
			},
			variants: {
				create: {
					horizontal: 7,
					diagonalAsc: 1,
					diagonalDesc: 1
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 6,
			unicode: '12108',
			logValues: {
				create: [
					{
						logTranslation: '???',
						logTransliteration: 'GÍR'
					},
					{
						logTranslation: '???',
						logTransliteration: 'UL4'
					}
				]
			},
			variants: {
				create: [
					{
						category: SignVariantCategory.DEFAULT,
						fontSet: FontSet.ULLIKUMMI_A,
						horizontal: 2,
						vertical: 3,
						diagonalAsc: 1,
						diagonalDesc: 1
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_B,
						horizontal: 2,
						vertical: 3,
						diagonalDesc: 2
					}
				]
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 7,
			unicode: '122FB',
			syllValues: ['tar', 'ḫaš'],
			logValues: {
				create: [
					{
						logTranslation: '???',
						logTransliteration: 'KU5'
					},
					{
						logTranslation: '???',
						logTransliteration: 'TAR'
					},
					{
						logTranslation: '???',
						logTransliteration: 'KUD'
					}
				]
			},
			variants: {
				create: [
					{
						category: SignVariantCategory.DEFAULT,
						fontSet: FontSet.ULLIKUMMI_A,
						horizontal: 2,
						vertical: 1
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_B,
						vertical: 1,
						diagonalDesc: 2
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_C,
						horizontal: 2,
						diagonalDesc: 1
					}
				]
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 8,
			unicode: '1202D',
			syllValues: ['an'],
			logValues: {
				create: [
					{
						logTranslation: 'heaven',
						logTransliteration: 'AN'
					},
					{
						logTranslation: 'god',
						logTransliteration: 'DINGIR'
					}
				]
			},
			detValues: {
				create: {
					detTranslation: 'god',
					detTransliteration: 'd'
				}
			},
			variants: {
				create: {
					horizontal: 2,
					vertical: 1
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 9,
			unicode: '12033',
			logValues: {
				create: [
					{
						logTranslation: '???',
						logTransliteration: 'APIN'
					},
					{
						logTranslation: '???',
						logTransliteration: 'ENGAR'
					}
				]
			},
			variants: {
				create: [
					{
						category: SignVariantCategory.DEFAULT,
						fontSet: FontSet.ULLIKUMMI_A,
						vertical: 1,
						horizontal: 4
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_B,
						vertical: 1,
						horizontal: 4
					}
				]
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 10,
			unicode: '12224',
			syllValues: ['maḫ'],
			logValues: {
				create: {
					logTranslation: '???',
					logTransliteration: 'MAḪ'
				}
			},
			variants: {
				create: [
					{
						category: SignVariantCategory.DEFAULT,
						fontSet: FontSet.ULLIKUMMI_A,
						vertical: 2,
						horizontal: 4,
						glossenkeil: 2
					},
					{
						category: SignVariantCategory.EARLY,
						fontSet: FontSet.ULLIKUMMI_B,
						vertical: 3,
						horizontal: 2,
						glossenkeil: 4
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_C,
						vertical: 2,
						horizontal: 4,
						glossenkeil: 2
					}
				]
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 11,
			unicode: '12261',
			syllValues: ['nu'],
			logValues: {
				create: {
					logTranslation: '???',
					logTransliteration: 'NU'
				}
			},
			variants: {
				create: {
					horizontal: 1,
					glossenkeil: 1
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 12,
			unicode: '121B0',
			syllValues: ['kul'],
			logValues: {
				create: [
					{
						logTranslation: '???',
						logTransliteration: 'KUL'
					},
					{
						logTranslation: '???',
						logTransliteration: 'NUMUN'
					}
				]
			},
			variants: {
				create: [
					{
						category: SignVariantCategory.DEFAULT,
						fontSet: FontSet.ULLIKUMMI_A,
						horizontal: 1,
						glossenkeil: 3
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_B,
						horizontal: 1,
						glossenkeil: 3
					}
				]
			}
		}
	});

	prisma.character.create({
		data: {
			id: 13,
			unicode: '12041',
			syllValues: ['pát/d', 'píd/t', 'pè', 'pì'],
			logValues: {
				create: [
					{
						logTranslation: '???',
						logTransliteration: 'BAD'
					},
					{
						logTranslation: '???',
						logTransliteration: 'BE'
					},
					{
						logTranslation: '???',
						logTransliteration: 'SUMUN'
					},
					{
						logTranslation: '???',
						logTransliteration: 'SUN'
					},
					{
						logTranslation: '???',
						logTransliteration: 'TIL'
					},
					{
						logTranslation: '???',
						logTransliteration: 'ÚŠ'
					}
				]
			},
			variants: {
				create: {
					horizontal: 1,
					glossenkeil: 1
				}
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 14,
			unicode: '12074',
			syllValues: ['dim', 'tim'],
			variants: {
				create: [
					{
						category: SignVariantCategory.DEFAULT,
						fontSet: FontSet.ULLIKUMMI_A,
						horizontal: 1,
						vertical: 1,
						diagonalAsc: 1,
						diagonalDesc: 1,
						glossenkeil: 2
					},
					{
						category: SignVariantCategory.LATE,
						fontSet: FontSet.ULLIKUMMI_B,
						horizontal: 2,
						vertical: 1,
						glossenkeil: 2,
						diagonalAsc: 1,
						diagonalDesc: 1
					}
				]
			}
		}
	});

	await prisma.character.create({
		data: {
			id: 15,
			unicode: '1223E',
			syllValues: ['na'],
			logValues: {
				create: {
					logTranslation: '???',
					logTransliteration: 'NA'
				}
			},
			variants: {
				create: [
					{
						vertical: 1,
						horizontal: 1,
						glossenkeil: 2
					}
				]
			}
		}
	});
	console.log('🌱 Seeing completed!');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
