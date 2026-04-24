import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. mock data changes
const newMockData = `const mockMerchants = [
  {
    id: '1014',
    name: '万选文旅',
    role: '服务商',
    status: '运营中',
    phone: '13800138000',
    marketScope: '全部集市商品',
    funds: { hkd: 12500.00 },
    miniapp: { appId: 'wx05a115bf6c7802eb', version: 'v1.2.0', status: '已发布' },
    payment: { domesticMchId: '1600000001', internationalMchId: 'HK99001122', status: '已配置' },
    filing: { customsCode: '312298001', port: '广州南沙' },
    children: [
      {
        id: '2055',
        name: 'HANNAH加盟店',
        role: '主理人',
        status: '运营中',
        phone: '13900139000',
        funds: { hkd: 0.00 },
        miniapp: { appId: 'wx7af9b4c37423cd39', version: 'v1.1.0', status: '审核中' },
        payment: { domesticMchId: '1600000001', linkedInfo: '复用服务商商户号', status: '未配置' },
        filing: { customsCode: '', port: '' },
      }
    ]
  },
  {
    id: '1018',
    name: '中出服免税',
    role: '服务商',
    status: '运营中',
    phone: '13811138111',
    marketScope: '自有货源',
    funds: { hkd: 88000.00 },
    miniapp: { appId: 'wx88a115bf6c7802ea', version: 'v1.5.0', status: '已发布' },
    payment: { domesticMchId: '1600000088', internationalMchId: 'HK99001188', status: '已配置' },
    filing: { customsCode: '312298002', port: '海南' },
    children: []
  }
];`;

content = content.replace(/const mockMerchants = \[[\s\S]*?\];\n\nconst mockMiniPrograms/m, newMockData + '\n\nconst mockMiniPrograms');

// Replace remaining "下游主理人" to "主理人"
content = content.replace(/下游主理人/g, '主理人');

// 2. removing supplyStatus and cny, update Table Columns
content = content.replace(/<th className="py-3 px-4 font-medium">分销商品范围<\/th>\n\s*<th className="py-3 px-4 font-medium">供货资格<\/th>\n\s*<th className="py-3 px-4 font-medium">账户资金状态<\/th>/g, 
  '<th className="py-3 px-4 font-medium">分销商品范围</th>\n                <th className="py-3 px-4 font-medium">商户号(支付)</th>\n                <th className="py-3 px-4 font-medium">账户资金(HKD)</th>');

content = content.replace(/<td className="py-3 px-4 text-gray-700">{merchant\.marketScope}<\/td>/g, 
  '<td className="py-3 px-4 text-gray-700">{merchant.role === "服务商" ? merchant.marketScope || "-" : "-"}</td>');

content = content.replace(/<td className="py-3 px-4">\n\s*<span className={`px-2 py-1 rounded text-xs border \${merchant\.supplyStatus === '正常出价' \? 'border-emerald-200 text-gray-700' : 'border-gray-200 text-gray-700'}`}>{merchant\.supplyStatus}<\/span>\n\s*<\/td>/g, 
  `<td className="py-3 px-4 text-xs font-mono">
                      <div className="text-gray-700">国内: {merchant.payment?.domesticMchId || '-'}</div>
                      {merchant.payment?.internationalMchId && <div className="text-gray-500 mt-0.5">国际: {merchant.payment?.internationalMchId}</div>}
                      {merchant.payment?.linkedInfo && <div className="text-brand mt-0.5 px-1 bg-brand-light/20 inline-block rounded">{merchant.payment.linkedInfo}</div>}
                    </td>`);
                    
content = content.replace(/<td className="py-3 px-4 text-gray-600">{child\.marketScope}<\/td>/g, 
  '<td className="py-3 px-4 text-gray-600">-</td>');
  
content = content.replace(/<td className="py-3 px-4">\n\s*<span className={`px-2 py-1 rounded text-xs border \${child\.supplyStatus === '正常出价' \? 'border-emerald-200 text-gray-700' : 'border-gray-200 text-gray-700'}`}>{child\.supplyStatus}<\/span>\n\s*<\/td>/g, 
  `<td className="py-3 px-4 text-xs font-mono">
                        <div className="text-gray-700">国内: {child.payment?.domesticMchId || '-'}</div>
                        {child.payment?.internationalMchId && <div className="text-gray-500 mt-0.5">国际: {child.payment?.internationalMchId}</div>}
                        {child.payment?.linkedInfo && <div className="text-brand mt-0.5 px-1.5 py-0.5 bg-brand-light/30 inline-block rounded">{child.payment.linkedInfo}</div>}
                      </td>`);

content = content.replace(/<td className="py-3 px-4 font-mono text-gray-600 text-xs font-medium">\n\s*<div>HKD {merchant\.funds\.hkd\.toLocaleString\('en-US', {minimumFractionDigits: 2}\)}<\/div>\n\s*<div>CNY {merchant\.funds\.cny\.toLocaleString\('en-US', {minimumFractionDigits: 2}\)}<\/div>\n\s*<\/td>/g, 
  `<td className="py-3 px-4 font-mono text-gray-800 text-sm font-medium">
                      HKD {merchant.funds.hkd.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </td>`);

content = content.replace(/<td className="py-3 px-4 font-mono text-gray-600 text-xs font-medium">\n\s*<div>HKD {child\.funds\.hkd\.toLocaleString\('en-US', {minimumFractionDigits: 2}\)}<\/div>\n\s*<div>CNY {child\.funds\.cny\.toLocaleString\('en-US', {minimumFractionDigits: 2}\)}<\/div>\n\s*<\/td>/g, 
  `<td className="py-3 px-4 font-mono text-gray-800 text-sm font-medium">
                        HKD {child.funds.hkd.toLocaleString('en-US', {minimumFractionDigits: 2})}
                      </td>`);


fs.writeFileSync('src/App.tsx', content);
console.log('Merchant modifications deployed.');
