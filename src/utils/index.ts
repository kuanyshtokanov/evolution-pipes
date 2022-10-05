export const rotatePipes = (currentPipe: string): string => {
  const pipesMap: any = {
    '╸': '╹',
    '╹': '╺',
    '╺': '╻',
    '╻': '╸',
  
    //long pipes
    '━': '┃',
    '┃': '━',
  
    //edge pipes
    '┏': '┓',
    '┛': '┗',
    '┓': '┛',
    '┗': '┏',
  
    //triangle pipes
    '┳': '┫',
    '┻': '┣',
    '┣': '┳',
    '┫': '┻',
  
    //cross pipes
    '╋': '╋',
  };
  return pipesMap[currentPipe];
};
