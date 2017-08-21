import _ from 'lodash';

export function quotedList(arr) {
	return (Array.isArray(arr) ? arr : [arr]).map(v => `'${v}'`).join();
}

export function mapToKeys(ids, values) {
	return _.map(ids, id => _.find(values, { id }));
}

export function mapToKeysMany(ids, values) {
	return _.map(ids, id => _.filter(values, { id }));
}
