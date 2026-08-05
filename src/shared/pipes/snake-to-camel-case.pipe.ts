import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { toCamel } from '../utils';

@Injectable()
export class SnakeToCamelCasePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'body' && value && typeof value === 'object') {
            return toCamel(value);
        }
        return value;
    }
}
