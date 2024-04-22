export class CityBy36Hours {
  constructor(public City: string, public Date: string) {}

  public currMinT: string = ''; //白天低溫度
  public currMaxT: string = ''; //白天高溫度

  public currWX: string = ''; //白天天氣描述
  public currWXValue: string = ''; //白天天氣代碼
  public currPoP: string = '';
}

export const Cities: string[] = [
  '臺北市',
  '新北市',
  '桃園市',
  '臺中市',
  '臺南市',
  '高雄市',
  '基隆市',
  '新竹縣',
  '新竹市',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義縣',
  '嘉義市',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
];
