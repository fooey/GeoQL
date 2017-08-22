
const ZipCodes = {
	alternativeCityNames: (zipCode, _, context) => context.loaders.ZipCode.getAlternativeCityNames.load(zipCode.zipCode),
	unacceptableCityNames: (zipCode, _, context) => context.loaders.ZipCode.getUnacceptableCityNames.load(zipCode.zipCode),
};

export default ZipCodes;
