using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 根据省份的TXT文件解析出相应的数据格式
    /// </summary>
    public class ProvinceFileReader
    {
        private string _ProvinceFilePath;
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="provinceFilePath"></param>
        public ProvinceFileReader(string provinceFilePath)
        {
            this._ProvinceFilePath = provinceFilePath;
        }
        /// <summary>
        /// 通过省份名称得到相应的区域列表（包含区域代码）
        /// </summary>
        /// <param name="provinceName"></param>
        /// <returns></returns>
        public string GetByProvinceName(string provinceName)
        {
            var result = new Dictionary<string, string>();
            var fileContent = File.ReadAllText(_ProvinceFilePath, Encoding.Default);

            var allProvinces = fileContent.Split(new string[] { "\r\n\t\r\n" }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var province in allProvinces)
            {
                if (string.IsNullOrEmpty(province))
                    continue;

                var provinceAreas = province.Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
                if (provinceAreas.Count() == 0)
                    continue;
                if (provinceAreas[0].Split('\t')[1] == provinceName)
                    result = _GetProvinceAreaByProvinceName(provinceAreas);

            }
            return ConvertResultToXmlFormat(result);


        }
        /// <summary>
        /// 通过省市名称得到相应的区域区域代码
        /// </summary>
        /// <param name="provinceCityName"></param>
        /// <returns></returns>
        public string GetByProvinceCityName(string provinceCityName)
        {
            var provinceName = provinceCityName.Split(' ')[0];
            var cityName=provinceCityName.Split(' ')[1];
            var result = new Dictionary<string, string>();
            var fileContent = File.ReadAllText(_ProvinceFilePath, Encoding.Default);

            var allProvinces = fileContent.Split(new string[] { "\r\n\t\r\n" }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var province in allProvinces)
            {
                if (string.IsNullOrEmpty(province))
                    continue;

                var provinceAreas = province.Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
                if (provinceAreas.Count() == 0)
                    continue;
                if (provinceAreas[0].Split('\t')[1] == provinceName)
                    result = _GetProvinceAreaByProvinceName(provinceAreas);

            }
            var stringBuilder = new StringBuilder();
            foreach (var item in result)
            {
                if (item.Value == cityName)
                    stringBuilder.AppendLine(item.Key);
            }
            return stringBuilder.ToString();


        }

        private string ConvertResultToXmlFormat(Dictionary<string, string> result)
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("<List>");
            foreach (var keyValuePair in result)
            {
                stringBuilder.AppendLine("<Record>");
                stringBuilder.AppendFormat("<ID>{0}</ID>\n", keyValuePair.Key);
                stringBuilder.AppendFormat("<Name>{0}</Name>\n", keyValuePair.Value);
                stringBuilder.AppendLine("</Record>");
            }
            stringBuilder.AppendLine("</List>");
            return stringBuilder.ToString();

        }

        private Dictionary<string, string> _GetProvinceAreaByProvinceName(string[] provinceAreas)
        {
            var result = new Dictionary<string, string>();

            for (int i = 1; i < provinceAreas.Count(); i++)
            {
                var keyValuePair = provinceAreas[i].Split('\t');
                if (keyValuePair.Count() != 2)
                    continue;
                result.Add(keyValuePair[0], keyValuePair[1]);
            }
            return result;
        }
    }
}
