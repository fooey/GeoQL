const ZipCode = `
	type ZipCode {
		id: ID
		zipCode: String
		cityName: String
		cityNameUrl: String
		countyName: String
		cityTypeCode: String
		countyName: String
		countyNameUrl: String
		countyFIPS: String
		stateName: String
		stateNameUrl: String
		stateAbbr: String
		stateFIPS: String
		msaCode: String
		areaCode: String
		timeZone: String
		utc: Float
		dst: String
		latitude: Float
		longitude: Float
		alternativeCityNames: [String]
		unacceptableCityNames: [String]
	}
`;

export default () => [ZipCode];
