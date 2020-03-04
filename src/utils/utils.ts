export abstract class Utils {

  static paginate(items: Array<any>, page: number = 1, pageSize: number): Array<any> {
    return items.slice((page - 1) * pageSize, page * pageSize);
  }

  static filterByAll(label: string, items: any) {
    const filter = label.toLowerCase().trim();

    return items.filter(item => {

      const findByProperty = (property: string): any => {
        return typeof item[property] === 'string' &&
          item[property].toLowerCase().includes(filter);
      };

      return Object.keys(item).some(findByProperty);
      });
  }

}
