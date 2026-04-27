import React, { useState } from 'react';
import { 
  Store, 
  AppWindow, 
  CreditCard, 
  Boxes, 
  BookOpen, 
  GitMerge, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Search, 
  X,
  ShieldCheck,
  Edit2,
  Save,
  Link as LinkIcon,
  AlertTriangle,
  FileText,
  Tags,
  Layers,
  Info,
  CheckCircle,
  Filter,
  Building2,
  Box,
  Plane
} from 'lucide-react';

// --- Mock Data ---
const mockMerchants = [
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
];

const mockMiniPrograms = [
  {
    id: 'wx05a115bf6c7802eb',
    merchantId: '1014',
    merchantName: '万选文旅',
    appName: '万选旅游',
    version: 'v1.2.0',
    status: '已发布',
    authTime: '2026-01-15 10:00:00'
  },
  {
    id: 'wx7af9b4c37423cd39',
    merchantId: '2055',
    merchantName: 'HANNAH加盟店',
    appName: '凯勤名品Pastelli',
    version: 'v1.1.0',
    status: '审核中',
    authTime: '2026-03-20 14:30:00'
  }
];

const mockProducts = [
  {
    id: 'TM190765ATJP142BLACK',
    brand: 'THE ANDAMANE',
    name: 'THE ANDAMANE女款THE ANDAMANE Top',
    category: '服装 > 上衣',
    price: '¥ 2,500.00',
    image: 'https://picsum.photos/seed/p1/200/200',
    filingInfo: {
      hsCode: '6103320000',
      commonUnit: '套',
      netWeight: '0.3',
      grossWeight: '0.5',
      elements: '品牌,材质,款式',
      unit1: '件',
      qty1: '1',
      unit2: '千克',
      qty2: '0.3',
      status: '已备案'
    },
    skus: [
      { id: 'SKU001', spec: '黑色 S', taxRate: '9.1%' },
      { id: 'SKU002', spec: '黑色 M', taxRate: '9.1%' }
    ],
    images: {
      main: ['https://picsum.photos/seed/p1/200/200', 'https://picsum.photos/seed/p1_d1/200/200'],
      lifestyle: ['https://picsum.photos/seed/p1_l1/200/200']
    }
  },
  {
    id: 'COL000102598L',
    brand: 'Mc2 Saint Barth',
    name: 'Mc2 Saint Barth女款Mc2 Saint Barth',
    category: '箱包 > 单肩包/斜挎包',
    price: '¥ 1,200.00',
    image: 'https://picsum.photos/seed/p2/200/200',
    filingInfo: {
      hsCode: '4202119090',
      commonUnit: '个',
      netWeight: '0.8',
      grossWeight: '1.2',
      elements: '品牌,材质',
      unit1: '个',
      qty1: '1',
      unit2: '千克',
      qty2: '0.8',
      status: '未备案'
    },
    skus: [
      { id: 'SKU003', spec: '大号', taxRate: '23.1%' },
      { id: 'SKU004', spec: '小号', taxRate: '23.1%' }
    ],
    images: {
      main: ['https://picsum.photos/seed/p2/200/200'],
      lifestyle: []
    }
  }
];

const initialBrands = [
  { id: 'B001', name: 'THE ANDAMANE', spuCount: 15 },
  { id: 'B002', name: 'Mc2 Saint Barth', spuCount: 8 },
  { id: 'B003', name: 'Nike', spuCount: 0 }
];

const initialCategories = [
  { id: 'C001', name: '服装', level: 1, hasFiling: true, spuCount: 45, children: [
    { id: 'C0011', name: '上衣', level: 2, hasFiling: true, spuCount: 30 },
    { id: 'C0012', name: '裙装', level: 2, hasFiling: false, spuCount: 15 }
  ]},
  { id: 'C002', name: '箱包', level: 1, hasFiling: true, spuCount: 12, children: [
    { id: 'C0021', name: '单肩包/斜挎包', level: 2, hasFiling: true, spuCount: 12 }
  ]},
  { id: 'C003', name: '鞋履', level: 1, hasFiling: true, spuCount: 0, children: []}
];

// --- Components ---

const Tag = ({ children, color = 'blue' }: { children: React.ReactNode, color?: 'blue' | 'orange' | 'green' | 'red' | 'cyan' | 'purple' | 'slate' }) => {
  const colorMap = {
    blue: 'bg-brand-light/30 text-brand border-brand/20',
    orange: 'bg-brand-light/30 text-brand border-brand/20',
    green: 'bg-brand-light/30 text-brand border-brand/20',
    red: 'bg-brand-light/30 text-brand border-brand/20',
    cyan: 'bg-gray-100 text-gray-700 border-gray-200',
    purple: 'bg-brand-light/30 text-brand border-brand/20',
    slate: 'bg-gray-50 text-gray-600 border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${colorMap[color]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('merchants');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({'1014': true});
  
  // Sub-navigation states
  const [publicLibTab, setPublicLibTab] = useState('products'); // products, brands, categories
  const [filingTab, setFilingTab] = useState('category'); // category, product, new-application
  
  // Modal States
  const [detailDrawer, setDetailDrawer] = useState<{isOpen: boolean, merchant: any, activeTab: string}>({isOpen: false, merchant: null, activeTab: 'basic'});
  const [addModal, setAddModal] = useState<{isOpen: boolean, type: 'provider' | 'sub', parentId?: string}>({isOpen: false, type: 'provider'});
  const [isEditingMerchant, setIsEditingMerchant] = useState(false);
  const [productDrawer, setProductDrawer] = useState<{isOpen: boolean, product: any}>({isOpen: false, product: null});
  const [addProductDrawer, setAddProductDrawer] = useState<{isOpen: boolean}>({isOpen: false});
  const [filingModal, setFilingModal] = useState<{isOpen: boolean, product: any}>({isOpen: false, product: null});
  const [fundsTab, setFundsTab] = useState('orders');
  const [editingMarketScope, setEditingMarketScope] = useState('全部集市商品');
  const [topupModal, setTopupModal] = useState<{isOpen: boolean, merchant: any}>({isOpen: false, merchant: null});

  // Mapping States
  const [mappingMerchant, setMappingMerchant] = useState('');
  const [selectedMerchantCats, setSelectedMerchantCats] = useState<string[]>([]);
  const [selectedPublicCat, setSelectedPublicCat] = useState<string>('');
  const [categoryMappings, setCategoryMappings] = useState<Record<string, {id: string, name: string}>>({});

  // Public Library Master Data States
  const [brands, setBrands] = useState(initialBrands);
  const [categories, setCategories] = useState(initialCategories);

  // Additional Modal States
  const [brandModal, setBrandModal] = useState<{isOpen: boolean, brand: any}>({isOpen: false, brand: null});
  const [categoryModal, setCategoryModal] = useState<{isOpen: boolean, category: any, parentId?: string}>({isOpen: false, category: null});
  const [migrateModal, setMigrateModal] = useState<{isOpen: boolean, source: any, type: 'brand' | 'category'}>({isOpen: false, source: null, type: 'brand'});
  const [reviewAppModal, setReviewAppModal] = useState<{isOpen: boolean, app: any | null}>({isOpen: false, app: null});
  const [dupeCheckState, setDupeCheckState] = useState<'idle' | 'checking' | 'found' | 'clean'>('idle');
  const [dedupeModal, setDedupeModal] = useState<{isOpen: boolean}>({isOpen: false});

  // Customs States
  const [customsOrderDrawer, setCustomsOrderDrawer] = useState<{isOpen: boolean, order: any}>({isOpen: false, order: null});
  const [customsProductDrawer, setCustomsProductDrawer] = useState<{isOpen: boolean, product: any}>({isOpen: false, product: null});
  const [customsWechatConfigModal, setCustomsWechatConfigModal] = useState(false);
  const [customsSFConfigModal, setCustomsSFConfigModal] = useState(false);

  // Navigation Items
  const navGroups = [
    {
      title: '商家与渠道',
      items: [
        { id: 'merchants', icon: Store, label: '商家列表' },
        { id: 'miniapps', icon: AppWindow, label: '小程序授权与发布' },
      ]
    },
    {
      title: '商品与业务',
      items: [
        { id: 'public-products', icon: Boxes, label: '公共商品库' },
        { id: 'hscode', icon: BookOpen, label: '公共备案与HSCode' },
        { id: 'mapping', icon: GitMerge, label: '商家分类映射' },
      ]
    },
    {
      title: '清关系统',
      items: [
        { id: 'customs-config', icon: Building2, label: '企业配置' },
        { id: 'customs-products', icon: Box, label: '商品海关备案' },
        { id: 'customs-orders', icon: Plane, label: '订单清关信息' }
      ]
    },
    {
      title: '财务报表',
      items: [
        { id: 'funds', icon: CreditCard, label: '资金对账中心' },
      ]
    }
  ];

  const toggleRow = (id: string) => setExpandedRows(prev => ({...prev, [id]: !prev[id]}));

  // --- Views ---

  const renderMerchantView = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 shrink-0">
        <h2 className="text-xl font-semibold text-gray-800">商家与权限控制中心</h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-200 mb-4 flex justify-between items-center">
          <div className="flex gap-4">
            <input type="text" placeholder="商家名称/ID/手机号" className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-brand/40" />
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-brand/40 text-gray-600">
              <option value="">全部状态</option>
              <option value="active">运营中</option>
              <option value="closed">已关闭</option>
            </select>
            <button className="bg-brand hover:bg-brand text-white px-4 py-1.5 rounded text-sm transition-colors flex items-center gap-1.5">
              <Search size={16} /> 搜索
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAddModal({isOpen: true, type: 'provider'})} className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors shadow-sm">
              <Plus size={16} /> 新增服务商
            </button>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 font-medium w-8"></th>
                <th className="py-3 px-4 font-medium">商家名称/ID</th>
                <th className="py-3 px-4 font-medium">角色定位</th>
                <th className="py-3 px-4 font-medium">分销商品范围</th>
                <th className="py-3 px-4 font-medium">商户号(支付)</th>
                <th className="py-3 px-4 font-medium">账户资金(HKD)</th>
                <th className="py-3 px-4 font-medium text-right">管理操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockMerchants.map(merchant => (
                <React.Fragment key={merchant.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      {merchant.children && merchant.children.length > 0 && (
                        <button onClick={() => toggleRow(merchant.id)} className="text-gray-400 hover:text-gray-600">
                          {expandedRows[merchant.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{merchant.name}</div>
                      <div className="text-gray-500 text-xs font-mono">{merchant.id}</div>
                    </td>
                    <td className="py-3 px-4"><Tag color="blue">{merchant.role}</Tag></td>
                    <td className="py-3 px-4 text-gray-700">{merchant.role === "服务商" ? merchant.marketScope || "-" : "-"}</td>
                    <td className="py-3 px-4 text-xs font-mono">
                      <div className="text-gray-700">国内: {merchant.payment?.domesticMchId || '-'}</div>
                      {merchant.payment && 'internationalMchId' in merchant.payment && <div className="text-gray-500 mt-0.5">国际: {(merchant.payment as any).internationalMchId}</div>}
                      {merchant.payment && 'linkedInfo' in merchant.payment && <div className="text-brand mt-0.5 px-1 bg-brand-light/20 inline-block rounded">{(merchant.payment as any).linkedInfo}</div>}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-800 text-sm font-medium">
                      HKD {merchant.funds.hkd.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button onClick={() => setActiveNav('funds')} className="text-gray-700 hover:text-gray-800 font-medium">对账</button>
                      <button onClick={() => { setDetailDrawer({isOpen: true, merchant, activeTab: 'basic'}); setIsEditingMerchant(false); setEditingMarketScope(merchant.marketScope || '全部集市商品'); }} className="text-brand hover:text-brand-hover font-medium">权限/基础设置</button>
                      <button onClick={() => setTopupModal({isOpen: true, merchant})} className="text-brand hover:text-brand-hover font-medium">充值</button>
                    </td>
                  </tr>
                  {expandedRows[merchant.id] && merchant.children?.map(child => (
                    <tr key={child.id} className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4"></td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <div className="w-4 h-[1px] bg-gray-300"></div>
                        <div>
                          <div className="text-gray-700 font-medium">{child.name}</div>
                          <div className="text-gray-500 text-xs font-mono">{child.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4"><Tag color="orange">{child.role}</Tag></td>
                      <td className="py-3 px-4 text-gray-600">-</td>
                      <td className="py-3 px-4 text-xs font-mono">
                        <div className="text-gray-700">国内: {child.payment?.domesticMchId || '-'}</div>
                        {child.payment && 'internationalMchId' in child.payment && <div className="text-gray-500 mt-0.5">国际: {(child.payment as any).internationalMchId}</div>}
                        {child.payment && 'linkedInfo' in child.payment && <div className="text-brand mt-0.5 px-1.5 py-0.5 bg-brand-light/30 inline-block rounded">{(child.payment as any).linkedInfo}</div>}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-800 text-sm font-medium">
                        HKD {child.funds.hkd.toLocaleString('en-US', {minimumFractionDigits: 2})}
                      </td>
                      <td className="py-3 px-4 text-right space-x-3">
                        <button onClick={() => setActiveNav('funds')} className="text-gray-700 hover:text-gray-800 font-medium">对账</button>
                        <button onClick={() => { setDetailDrawer({isOpen: true, merchant: child, activeTab: 'basic'}); setIsEditingMerchant(false); setEditingMarketScope((child as any).marketScope || '全部集市商品'); }} className="text-brand hover:text-brand-hover font-medium">权限/基础设置</button>
                        <button onClick={() => setTopupModal({isOpen: true, merchant: child})} className="text-brand hover:text-brand-hover font-medium">充值</button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMiniProgramView = () => (
    <div className="animate-in fade-in duration-300 p-6 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <AppWindow className="text-gray-500" /> 小程序授权与发布
        </h2>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 hover:border-brand/40 hover:text-brand text-gray-700 px-4 py-2 rounded-md text-sm transition-colors">查看所有审核状态</button>
          <button className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-md text-sm transition-colors shadow-sm">新增授权</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 flex gap-4 items-center">
        <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand/40" placeholder="AppID / 应用名称" />
        <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand/40" placeholder="绑定的商家名称" />
        <button className="bg-brand hover:bg-brand text-white px-5 py-1.5 rounded-md text-sm transition-colors">查询</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-6 font-medium">App名称</th>
              <th className="py-3 px-4 font-medium">AppID</th>
              <th className="py-3 px-4 font-medium">绑定商家</th>
              <th className="py-3 px-4 font-medium">当前版本</th>
              <th className="py-3 px-4 font-medium">状态</th>
              <th className="py-3 px-6 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockMiniPrograms.map(app => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-800">{app.appName}</td>
                <td className="py-4 px-4 font-mono text-gray-500">{app.id}</td>
                <td className="py-4 px-4 text-brand hover:underline cursor-pointer">{app.merchantName}</td>
                <td className="py-4 px-4 font-mono text-gray-600">{app.version}</td>
                <td className="py-4 px-4">
                  <Tag color={app.status === '已发布' ? 'green' : 'orange'}>{app.status}</Tag>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-3 text-blue-500">
                    <button className="hover:underline">上传代码</button>
                    <button className="hover:underline">提交审核</button>
                    <button className="hover:underline">发布</button>
                    <button className="hover:underline">更多</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPublicLibraryView = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">公共商品库</h2>
      </div>

      {/* Internal Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {[
          { id: 'products', label: '商品维护', icon: Boxes },
          { id: 'brands', label: '品牌维护', icon: Tags },
          { id: 'categories', label: '分类维护', icon: Layers },
          { id: 'applications', label: '新品申请', icon: FileText },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setPublicLibTab(tab.id)}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              publicLibTab === tab.id ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {publicLibTab === 'applications' && (
        <div className="flex-1 flex flex-col animate-in fade-in">
          <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4 flex justify-between items-center shadow-sm">
            <div className="flex gap-3">
               <div className="relative">
                  <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
                  <input type="text" className="border border-gray-300 rounded-md py-1.5 pl-8 pr-3 text-sm w-64 focus:outline-none focus:border-brand focus:ring-1 focus:ring-black" placeholder="搜索申请单号/商家/商品名" />
               </div>
               <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand">
                 <option>全部状态</option>
                 <option>待审核</option>
                 <option>已通过</option>
                 <option>已驳回</option>
               </select>
            </div>
            <button className="bg-brand text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 shadow-sm hover:bg-brand-hover">
               批量同意
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="py-3 px-6 font-medium w-12"><input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /></th>
                  <th className="py-3 px-4 font-medium">申请商家</th>
                  <th className="py-3 px-4 font-medium">商品信息</th>
                  <th className="py-3 px-4 font-medium">参考品牌/分类</th>
                  <th className="py-3 px-4 font-medium">提交时间</th>
                  <th className="py-3 px-4 font-medium">状态</th>
                  <th className="py-3 px-6 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {[1, 2, 3].map(id => (
                  <tr key={id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6"><input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /></td>
                    <td className="py-4 px-4 text-gray-800 font-medium whitespace-nowrap">万选文旅 (1014)</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400 text-xs">暂无原图</div>
                        <div>
                           <div className="text-gray-800 font-medium line-clamp-1">ROLEX 劳力士潜航者型系列绿水鬼</div>
                           <div className="text-gray-500 text-xs mt-0.5">参考货号: 126610LV-0002</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-800">ROLEX</span>
                        <span className="text-gray-500 text-xs">钟表 &gt; 腕表</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-xs whitespace-nowrap">2026-04-17 14:30</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs border bg-gray-50 text-gray-600 border-gray-200">待审核</span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                      <button 
                        onClick={() => setReviewAppModal({isOpen: true, app: { id, merchant: '万选文旅 (1014)', name: 'ROLEX 劳力士潜航者型系列绿水鬼', refBrand: 'ROLEX', refCategory: '钟表 > 腕表' }})} 
                        className="text-brand hover:underline font-medium"
                      >
                        审核与编辑
                      </button>
                      <button className="text-brand hover:text-gray-700 font-medium hover:underline">快捷驳回</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {publicLibTab === 'products' && (
        <div className="flex-1 flex flex-col animate-in fade-in">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 flex justify-between items-center">
            <div className="flex gap-3">
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand">
                <option>请选择或搜索品牌</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand">
                <option>选择分类筛选</option>
              </select>
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-brand" placeholder="输入 SPU 货号查询" />
              <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2">
                <Search size={16} /> 查询
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <button 
                onClick={() => setAddProductDrawer({isOpen: true})} 
                className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus size={16} /> 新增公共 SPU
              </button>
              <button 
                onClick={() => setDedupeModal({isOpen: true})}
                className="text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-md text-sm flex items-center gap-1.5 transition-colors"
                title="针对百万级商品进行 AI 聚类与排查"
              >
                <div className="relative">
                   <AlertTriangle size={16} />
                   <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gray-400"></span>
                </div>
                进入商品去重治理中心
              </button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-6 font-medium">商品信息</th>
                  <th className="py-3 px-4 font-medium">标准货号</th>
                  <th className="py-3 px-4 font-medium">品牌 / 分类</th>
                  <th className="py-3 px-4 font-medium">官方价格</th>
                  <th className="py-3 px-6 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded object-cover border border-gray-200" referrerPolicy="no-referrer" />
                        <span className="text-gray-800 font-medium line-clamp-2 w-48">{prod.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-600">{prod.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-800">{prod.brand}</span>
                        <span className="text-gray-500 text-xs">{prod.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-800 font-medium">{prod.price}</td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button onClick={() => setProductDrawer({isOpen: true, product: prod})} className="text-brand hover:underline font-medium">详情维护</button>
                      <button className="text-brand hover:text-gray-700 hover:underline font-medium">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {publicLibTab === 'brands' && (
        <div className="flex-1 flex flex-col animate-in fade-in">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 flex justify-between items-center">
            <div className="flex gap-3">
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-brand" placeholder="搜索品牌名称" />
              <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2">
                <Search size={16} /> 查询
              </button>
            </div>
            <button onClick={() => setBrandModal({isOpen: true, brand: null})} className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 shadow-sm">
              <Plus size={16} /> 新增品牌
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-6 font-medium">品牌 ID</th>
                  <th className="py-3 px-4 font-medium">品牌名称</th>
                  <th className="py-3 px-4 font-medium">SPU 数</th>
                  <th className="py-3 px-6 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {brands.map(brand => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-gray-600">{brand.id}</td>
                    <td className="py-4 px-4 text-gray-800 font-medium">{brand.name}</td>
                    <td className="py-4 px-4 text-gray-600 font-medium">{brand.spuCount}</td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button 
                        onClick={() => setBrandModal({isOpen: true, brand})} 
                        className="text-brand hover:underline font-medium"
                      >编辑</button>
                      <button 
                        onClick={() => setMigrateModal({isOpen: true, source: brand, type: 'brand'})} 
                        className="text-brand hover:underline font-medium"
                      >迁移SPU</button>
                      {brand.spuCount === 0 ? (
                        <button 
                          onClick={() => setBrands(brands.filter(b => b.id !== brand.id))}
                          className="text-brand hover:underline font-medium"
                        >删除</button>
                      ) : (
                        <span className="text-gray-300 font-medium cursor-not-allowed" title="该品牌下有商品，无法删除">删除</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {publicLibTab === 'categories' && (
        <div className="flex-1 flex flex-col animate-in fade-in">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 flex justify-between items-center">
            <div className="flex gap-3">
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-brand" placeholder="搜索分类名称" />
              <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2">
                <Search size={16} /> 查询
              </button>
            </div>
            <button onClick={() => setCategoryModal({isOpen: true, category: null})} className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 shadow-sm">
              <Plus size={16} /> 新增一级分类
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-6 font-medium">分类名称</th>
                  <th className="py-3 px-4 font-medium">层级</th>
                  <th className="py-3 px-4 font-medium">SPU 数</th>
                  <th className="py-3 px-4 font-medium">关联备案规则</th>
                  <th className="py-3 px-6 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map(cat => (
                  <React.Fragment key={cat.id}>
                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50/30">
                      <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-2">
                        <ChevronDown size={16} className="text-gray-400" />
                        {cat.name}
                      </td>
                      <td className="py-4 px-4 text-gray-500">一级分类</td>
                      <td className="py-4 px-4 text-gray-600 font-medium">{cat.spuCount}</td>
                      <td className="py-4 px-4">
                        {cat.hasFiling ? (
                          <span className="text-gray-700 flex items-center gap-1"><ShieldCheck size={14} /> 已关联</span>
                        ) : (
                          <button onClick={() => {setActiveNav('hscode'); setFilingTab('category')}} className="text-orange-500 hover:underline flex items-center gap-1"><AlertTriangle size={14} /> 去关联</button>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => setCategoryModal({isOpen: true, category: null, parentId: cat.id})} className="text-brand hover:underline font-medium">添加子分类</button>
                        <button onClick={() => setCategoryModal({isOpen: true, category: cat})} className="text-brand hover:underline font-medium">编辑</button>
                        <button onClick={() => setMigrateModal({isOpen: true, source: cat, type: 'category'})} className="text-brand hover:underline font-medium">迁移SPU</button>
                        {cat.spuCount === 0 && (!cat.children || cat.children.length === 0) ? (
                          <button 
                            onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                            className="text-brand hover:underline font-medium"
                          >删除</button>
                        ) : (
                          <span className="text-gray-300 font-medium cursor-not-allowed" title={cat.children && cat.children.length > 0 ? "请先删除子分类" : "有商品关联，无法删除"}>删除</span>
                        )}
                      </td>
                    </tr>
                    {cat.children.map(child => (
                      <tr key={child.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-6 pl-12 text-gray-700">{child.name}</td>
                        <td className="py-3 px-4 text-gray-500">二级分类</td>
                        <td className="py-3 px-4 text-gray-600 font-medium">{child.spuCount}</td>
                        <td className="py-3 px-4">
                          {child.hasFiling ? (
                            <span className="text-gray-700 flex items-center gap-1"><ShieldCheck size={14} /> 已关联</span>
                          ) : (
                            <button onClick={() => {setActiveNav('hscode'); setFilingTab('category')}} className="text-orange-500 hover:underline flex items-center gap-1"><AlertTriangle size={14} /> 去关联</button>
                          )}
                        </td>
                        <td className="py-3 px-6 text-right space-x-3">
                          <button onClick={() => setCategoryModal({isOpen: true, category: child, parentId: cat.id})} className="text-brand hover:underline font-medium">编辑</button>
                          <button onClick={() => setMigrateModal({isOpen: true, source: child, type: 'category'})} className="text-brand hover:underline font-medium">迁移SPU</button>
                          {child.spuCount === 0 ? (
                            <button 
                              onClick={() => {
                                const newCats = categories.map(c => {
                                  if (c.id === cat.id) {
                                    return { ...c, children: c.children.filter(ch => ch.id !== child.id) };
                                  }
                                  return c;
                                });
                                setCategories(newCats);
                              }}
                              className="text-brand hover:underline font-medium"
                            >删除</button>
                          ) : (
                            <span className="text-gray-300 font-medium cursor-not-allowed" title="有商品关联，无法删除">删除</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderHSCodeView = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">公共备案与HSCode</h2>
      </div>

      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button onClick={() => setFilingTab('category')} className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${filingTab === 'category' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-black'}`}>
          <BookOpen size={16} /> 分类默认备案规则
        </button>
        <button onClick={() => setFilingTab('product')} className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${filingTab === 'product' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-black'}`}>
          <FileText size={16} /> 指定商品备案维护
        </button>
      </div>

      {filingTab === 'category' && (
        <div className="flex gap-6 flex-1 min-h-0 animate-in fade-in">
          {/* Left Sidebar - Categories */}
          <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="font-medium text-gray-700 text-sm">公共申报品类树</span>
            </div>
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
                <input type="text" placeholder="搜索分类" className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-brand" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <div className="text-sm">
                <div className="flex items-center gap-1 py-1.5 px-2 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium">
                  <ChevronDown size={14} /> 服装
                </div>
                <div className="ml-5 space-y-0.5">
                  {['裙装', '夹克/外套', '卫衣', '上衣', '棉制长裤、护胸背带工装裤、马裤及短裤', '大衣', 'POLO/T恤', '内衣/内裤'].map(cat => (
                    <div key={cat} className={`py-1.5 px-3 rounded cursor-pointer ${cat === '夹克/外套' ? 'bg-cyan-50 text-cyan-700 font-medium border-l-2 border-cyan-500' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Decision Branches */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-800">属性决策分支：夹克/外套</h3>
              <button className="bg-brand text-white hover:bg-brand-hover px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1">
                <Plus size={14} /> 新增属性判定分支
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              <div className="bg-white border border-emerald-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2.5 border-b border-emerald-200 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand text-white text-xs px-2 py-0.5 rounded font-medium">分支 A</span>
                    <span className="font-medium text-emerald-800 text-sm">判定分支</span>
                  </div>
                  <div className="space-x-3 text-sm">
                    <button className="text-blue-500 hover:underline">编辑</button>
                  </div>
                </div>
                <div className="p-4">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 text-gray-500 w-24">判定性别</td>
                        <td className="py-2 text-gray-800 w-1/3">男式</td>
                        <td className="py-2 text-gray-500 w-24">材质关键字</td>
                        <td className="py-2 text-gray-800">棉</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-500">HS Code</td>
                        <td className="py-2 font-mono text-gray-800">6103320000</td>
                        <td className="py-2 text-gray-500">常用单位</td>
                        <td className="py-2 text-gray-800">套</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filingTab === 'product' && (
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden animate-in fade-in">
           <div className="p-4 border-b border-gray-200 flex gap-4 items-center bg-gray-50/50">
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand/40" placeholder="商家 ID" />
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-brand/40" placeholder="输入 SPU 货号查询" />
              <button className="bg-brand hover:bg-brand text-white px-5 py-1.5 rounded-md text-sm transition-colors">查询</button>
           </div>
           <div className="flex-1 overflow-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 sticky top-0">
                  <tr>
                    <th className="py-3 px-6 font-medium">标准货号</th>
                    <th className="py-3 px-4 font-medium">商品名称</th>
                    <th className="py-3 px-4 font-medium">商家 ID</th>
                    <th className="py-3 px-4 font-medium">特定 HS Code</th>
                    <th className="py-3 px-4 font-medium">备案状态</th>
                    <th className="py-3 px-6 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockProducts.map(prod => (
                    <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-mono text-gray-600">{prod.id}</td>
                      <td className="py-4 px-4 text-gray-800">{prod.name}</td>
                      <td className="py-4 px-4 font-mono text-gray-500">1567</td>
                      <td className="py-4 px-4"><span className="font-mono text-brand">{prod.filingInfo.hsCode}</span></td>
                      <td className="py-4 px-4">
                        <Tag color={prod.filingInfo.status === '已备案' ? 'green' : 'orange'}>{prod.filingInfo.status}</Tag>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => setFilingModal({isOpen: true, product: prod})} className="text-brand hover:text-brand font-medium">修改备案</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );

  const handleMapCategories = () => {
    if (selectedMerchantCats.length === 0 || !selectedPublicCat) return;

    let publicCatName = '';
    categories.forEach(c => {
      if (c.id === selectedPublicCat) publicCatName = c.name;
      c.children.forEach(child => {
        if (child.id === selectedPublicCat) publicCatName = `${c.name} > ${child.name}`;
      });
    });

    const newMappings = { ...categoryMappings };
    selectedMerchantCats.forEach(id => {
      newMappings[id] = { id: selectedPublicCat, name: publicCatName };
    });
    setCategoryMappings(newMappings);
    setSelectedMerchantCats([]);
    setSelectedPublicCat('');
  };

  const renderCategoryMappingView = () => {
    return (
      <div className="animate-in fade-in duration-300 h-full flex flex-col p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">商家分类映射</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-24">选择商家</label>
          <div className="relative group w-80">
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black bg-white cursor-text transition-all">
              <Search size={14} className="text-gray-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="输入商家ID/名称搜索..." 
                className="w-full outline-none bg-transparent min-w-0" 
                value={mappingMerchant}
                onChange={(e) => setMappingMerchant(e.target.value)}
              />
              <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
            </div>
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within:block z-20">
               <div className="max-h-48 overflow-y-auto py-1">
                   {mockMerchants.map(m => (
                     <div 
                       key={m.id} 
                       className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center"
                       onMouseDown={() => setMappingMerchant(`${m.id} - ${m.name}`)}
                     >
                       <span className="font-mono text-gray-500 mr-2">{m.id}</span>
                       <span className="text-gray-800">{m.name}</span>
                     </div>
                   ))}
               </div>
            </div>
          </div>
        </div>

        {mappingMerchant ? (
          <div className="flex-1 flex gap-6 min-h-0">
            {/* Left side: Merchant Categories */}
            <div className="w-1/2 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-800 flex items-center justify-between">
                <span>商家内部系统分类 (支持多选)</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[
                  { id: 'MC001', name: '男装', children: [
                    { id: 'MC0011', name: 'T恤' },
                    { id: 'MC0012', name: '毛衣' }
                  ]},
                  { id: 'MC002', name: '女装', children: [
                    { id: 'MC0021', name: '连衣裙' },
                    { id: 'MC0022', name: '半身裙' }
                  ]}
                ].map(cat => (
                  <div key={cat.id} className="mb-2">
                    <label className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-brand focus:ring-brand mr-3"
                        checked={selectedMerchantCats.includes(cat.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedMerchantCats([...selectedMerchantCats, cat.id]);
                          else setSelectedMerchantCats(selectedMerchantCats.filter(id => id !== cat.id));
                        }}
                      />
                      <span className="font-medium text-gray-800 text-sm">{cat.name}</span>
                      {categoryMappings[cat.id] && (
                        <span className="ml-2 text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                          <LinkIcon size={12} /> {categoryMappings[cat.id].name}
                        </span>
                      )}
                    </label>
                    <div className="ml-6 border-l-2 border-gray-100 pl-2 mt-1 space-y-1">
                      {cat.children.map(child => (
                        <label key={child.id} className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-brand focus:ring-brand mr-3"
                            checked={selectedMerchantCats.includes(child.id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedMerchantCats([...selectedMerchantCats, child.id]);
                              else setSelectedMerchantCats(selectedMerchantCats.filter(id => id !== child.id));
                            }}
                          />
                          <span className="text-gray-600 text-sm">{child.name}</span>
                          {categoryMappings[child.id] && (
                            <span className="ml-2 text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                              <LinkIcon size={12} /> {categoryMappings[child.id].name}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Action button */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <button 
                className="bg-brand text-white hover:bg-brand-hover w-24 py-2 rounded-md shadow-sm transition-colors text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:hover:bg-brand disabled:cursor-not-allowed"
                onClick={handleMapCategories}
                disabled={selectedMerchantCats.length === 0 || !selectedPublicCat}
              >
                <GitMerge size={16} /> 映射
              </button>
            </div>

            {/* Right side: Public Categories */}
            <div className="w-1/2 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-800 flex justify-between items-center">
                <span>公共库分类 (单选)</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">标准品类树</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {categories.map(cat => (
                  <div key={cat.id} className="mb-2">
                    <div className="flex items-center px-2 py-1.5 rounded font-medium text-gray-800 text-sm">
                      {cat.name}
                    </div>
                    <div className="ml-4 pl-2 mt-1 space-y-1">
                      {cat.children.map(child => (
                        <label key={child.id} className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer group">
                          <input 
                            type="radio" 
                            name="publicCatMapping"
                            className="border-gray-300 text-brand focus:ring-brand mr-3"
                            checked={selectedPublicCat === child.id}
                            onChange={() => setSelectedPublicCat(child.id)}
                          />
                          <span className="text-gray-600 text-sm">{child.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-3">
            <GitMerge size={48} className="text-gray-200" />
            <p>请先在上方选择商户以进行分类映射配置</p>
          </div>
        )}
      </div>
    );
  };

  const renderFundsView = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="w-1 h-5 bg-brand rounded-full"></div>
          资金对账中心
        </h2>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-2">待结算资金池</div>
          <div className="text-2xl font-bold text-gray-800">￥ 657.00</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-2">收入</div>
          <div className="text-2xl font-bold text-gray-700">￥ 342,116.12</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-2">店铺税金余额</div>
          <div className="text-2xl font-bold text-gray-800">￥ -58.75</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button onClick={() => setFundsTab('orders')} className={`pb-3 text-sm font-medium border-b-2 transition-colors ${fundsTab === 'orders' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
          订单交易流水
        </button>
        <button onClick={() => setFundsTab('service')} className={`pb-3 text-sm font-medium border-b-2 transition-colors ${fundsTab === 'service' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
          服务账户流水
        </button>
      </div>

      {fundsTab === 'orders' && (
        <div className="flex-1 flex flex-col animate-in fade-in">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 flex-wrap">
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none focus:border-brand/40" placeholder="商家名称/ID" />
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none focus:border-brand/40" placeholder="订单号" />
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none focus:border-brand/40" placeholder="支付单号" />
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-brand/40 text-gray-600">
                <option value="">订单状态</option>
                <option value="paid">已支付</option>
                <option value="clearing">清关中</option>
                <option value="shipped">已发货</option>
                <option value="completed">交易完成</option>
                <option value="closed">交易关闭</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-brand/40 text-gray-600">
                <option value="">支付方式</option>
                <option value="intl">国际支付</option>
                <option value="domestic">国内支付</option>
              </select>
              <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-md text-sm transition-colors">
                查询
              </button>
            </div>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm transition-colors shadow-sm whitespace-nowrap">
              批量导出流水
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto flex-1">
            <table className="w-full text-left text-sm min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-4 font-medium">订单号 / 支付单号</th>
                  <th className="py-3 px-4 font-medium">销售商家</th>
                  <th className="py-3 px-4 font-medium">交易状态</th>
                  <th className="py-3 px-4 font-medium">实付金额 / 支付方式</th>
                  <th className="py-3 px-4 font-medium">扣除项 (手续费/税费/运费)</th>
                  <th className="py-3 px-4 font-medium">分账标识</th>
                  <th className="py-3 px-4 font-medium">货主定扎明细</th>
                  <th className="py-3 px-4 font-medium">分佣方明细</th>
                  <th className="py-3 px-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { orderId: 'OD20240419113', payId: 'P20240419113941', store: '1014 - 万选文旅', status: '待发货', progress: '已清关', total: 'HKD 1,485.50', payType: '国际支付', fee: 'HKD 14.85', tax: 'HKD 54.00', shipping: 'HKD 45.00', hasSplit: true, owner: '万选文旅', ownerAmt: 'HKD 1,221.65', broker: '平台分佣', brokerAmt: 'HKD 150.00' },
                  { orderId: 'OD20240418214', payId: 'P20240418104845', store: '2055 - HANNAH加盟店', status: '已完成', progress: '已完成', total: 'CNY 714.61', payType: '国内支付', fee: 'CNY 4.28', tax: 'CNY 65.00', shipping: 'CNY 15.00', hasSplit: true, owner: '万选文旅', ownerAmt: 'CNY 500.00', broker: 'HANNAH加盟店', brokerAmt: 'CNY 130.33' },
                  { orderId: 'OD20240417101', payId: 'P20240415951662', store: '1018 - 中出服免税', status: '交易关闭', progress: '主动取消', total: 'CNY 310.94', payType: '国内支付', fee: 'CNY 0.00', tax: 'CNY 0.00', shipping: 'CNY 0.00', hasSplit: false, owner: '--', ownerAmt: '--', broker: '--', brokerAmt: '--' },
                  { orderId: 'OD20240414166', payId: 'P20240416481294', store: '1014 - 万选文旅', status: '已发货', progress: '运输中', total: 'HKD 992.13', payType: '国际支付', fee: 'HKD 9.92', tax: 'HKD 90.50', shipping: 'HKD 45.00', hasSplit: true, owner: '万选文旅', ownerAmt: 'HKD 846.71', broker: '--', brokerAmt: '--' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono text-gray-800">{row.orderId}</div>
                      <div className="text-gray-400 text-xs font-mono">P: {row.payId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-brand font-medium cursor-pointer hover:underline">{row.store}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={row.status === '交易关闭' ? 'text-gray-500' : 'text-gray-800'}>{row.status}</div>
                      <div className="text-xs text-gray-500">{row.progress}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{row.total}</div>
                      <Tag color={row.payType === '国际支付' ? 'blue' : 'green'}>{row.payType}</Tag>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="grid grid-cols-[50px_1fr] gap-x-2">
                        <span className="text-gray-500 text-right">手续费:</span><span className="text-red-500 font-mono">-{row.fee}</span>
                        <span className="text-gray-500 text-right">税费:</span><span className="text-orange-500 font-mono">-{row.tax}</span>
                        <span className="text-gray-500 text-right">运费:</span><span className="text-blue-500 font-mono">-{row.shipping}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {row.hasSplit ? <Tag color="green">已分账</Tag> : <span className="text-gray-400 text-xs">未分账</span>}
                    </td>
                    <td className="py-3 px-4">
                       <div className="text-gray-700 font-medium">{row.owner}</div>
                       <div className="text-xs font-mono text-gray-500">{row.ownerAmt}</div>
                    </td>
                    <td className="py-3 px-4">
                       <div className="text-gray-700 font-medium">{row.broker}</div>
                       <div className="text-xs font-mono text-gray-500">{row.brokerAmt}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-brand hover:text-brand-hover hover:underline text-sm font-medium">详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {fundsTab === 'service' && (
        <div className="flex-1 flex flex-col animate-in fade-in">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
              <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-emerald-500" placeholder="商家名称/ID" />
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-emerald-500 text-gray-600">
                <option value="">全部类型</option>
                <option value="topup">充值</option>
                <option value="deduct">扣减</option>
              </select>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                <input type="text" className="px-3 py-1.5 text-sm w-32 focus:outline-none" placeholder="开始日期" />
                <span className="text-gray-400 px-2">至</span>
                <input type="text" className="px-3 py-1.5 text-sm w-32 focus:outline-none" placeholder="结束日期" />
              </div>
              <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-md text-sm transition-colors">
                查询
              </button>
            </div>
            <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded-md text-sm transition-colors shadow-sm flex items-center gap-1.5">
              <Plus size={16} /> 新增充值/扣减
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-4 font-medium">流水号</th>
                  <th className="py-3 px-4 font-medium">商家名称/ID</th>
                  <th className="py-3 px-4 font-medium">类型</th>
                  <th className="py-3 px-4 font-medium">金额</th>
                  <th className="py-3 px-4 font-medium">币种</th>
                  <th className="py-3 px-4 font-medium">操作时间</th>
                  <th className="py-3 px-4 font-medium">操作人</th>
                  <th className="py-3 px-4 font-medium">备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: 'TXN202604120001', merchant: '万选文旅', merchantId: '1014', type: '充值', amount: '+5000.00', currency: 'CNY', time: '2026-04-12 10:30:00', operator: 'admin', remark: '预存货款' },
                  { id: 'TXN202604110002', merchant: 'HANNAH加盟店', merchantId: '2055', type: '扣减', amount: '-150.00', currency: 'HKD', time: '2026-04-11 15:45:22', operator: 'system', remark: '系统服务费扣除' },
                  { id: 'TXN202604100003', merchant: '万选文旅', merchantId: '1014', type: '充值', amount: '+10000.00', currency: 'HKD', time: '2026-04-10 09:15:00', operator: 'admin', remark: '保证金充值' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-gray-500">{row.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{row.merchant}</div>
                      <div className="text-gray-400 text-xs font-mono">{row.merchantId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Tag color={row.type === '充值' ? 'green' : 'orange'}>{row.type}</Tag>
                    </td>
                    <td className={`py-3 px-4 font-medium ${row.type === '充值' ? 'text-gray-700' : 'text-gray-700'}`}>{row.amount}</td>
                    <td className="py-3 px-4 text-gray-600">{row.currency}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{row.time}</td>
                    <td className="py-3 px-4 text-gray-600">{row.operator}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs max-w-[200px] truncate" title={row.remark}>{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderCustomsConfig = () => {
    return (
      <div className="animate-in fade-in duration-300 h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">企业配置</h2>
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-base font-semibold border-b border-gray-100 pb-3 mb-4">基本信息</h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div><span className="text-gray-500 mr-2">企业名称:</span> 斐宁(直邮)</div>
              <div><span className="text-gray-500 mr-2">电话:</span> 15000000001</div>
              <div><span className="text-gray-500 mr-2">登录账号:</span> feining</div>
              <div className="flex items-center gap-2"><span className="text-gray-500">是否支付单:</span> <Tag color="green">是</Tag></div>
              <div className="flex items-center gap-2"><span className="text-gray-500">是否推运单:</span> <Tag color="green">是</Tag></div>
              <div className="flex items-center gap-2"><span className="text-gray-500">是否推订单:</span> <Tag color="green">是</Tag></div>
              <div className="flex items-center gap-2"><span className="text-gray-500">是否推清单:</span> <Tag color="red">否</Tag></div>
              <div className="col-span-2"><span className="text-gray-500 mr-2">app_key:</span> OnO6iBzoC0ukF1OVGsBURD9Z3tw9HXuT</div>
              <div className="col-span-3"><span className="text-gray-500 mr-2">app_secret:</span> zParQjxdUf2mPYkPMiVF7aE23Rfxw5yJo7soHDlu</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {/* 支付配置 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold border-b border-gray-100 pb-3 mb-4">支付配置</h3>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span className="text-gray-500">新易生:</span> <button className="text-brand hover:underline">报关配置</button></div>
                  <div className="flex items-center gap-2"><span className="text-gray-500">微信:</span> <button onClick={() => setCustomsWechatConfigModal(true)} className="text-brand hover:underline">报关配置</button></div>
                </div>
                <div className="flex items-center gap-2"><span className="text-gray-500">香港微信:</span> <button className="text-brand hover:underline">报关配置</button></div>
              </div>
            </div>

            {/* 运单配置 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h3 className="text-base font-semibold">运单配置</h3>
                <button className="text-brand hover:underline text-sm font-medium">推送设置</button>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-2"><span className="text-gray-500">顺丰直邮:</span> <button onClick={() => setCustomsSFConfigModal(true)} className="text-brand hover:underline">报关配置</button></div>
              </div>
            </div>

            {/* 海关配置 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold border-b border-gray-100 pb-3 mb-4">海关配置</h3>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span className="text-gray-500">宁波:</span> <button className="text-brand hover:underline">订单报关配置</button></div>
                  <div className="flex items-center gap-2"><span className="text-gray-500">宁波:</span> <button className="text-brand hover:underline">清单报关配置</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomsProducts = () => {
    return (
      <div className="animate-in fade-in duration-300 h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">商品海关备案</h2>
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-200 mb-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-600">备案名称:</label>
              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand/40" />
              <label className="text-sm text-gray-600 ml-2">SKU:</label>
              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand/40" />
              <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors ml-2">搜索</button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-1.5 rounded text-sm transition-colors">重置</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-t-sm border border-gray-200 border-b-0 flex gap-2">
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">新增</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">删除</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">商品导入</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">商品导出</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">同步菜鸟</button>
          </div>
          <div className="bg-white rounded-sm shadow-sm border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 font-medium w-10 text-center"><input type="checkbox" className="rounded text-brand focus:ring-brand accent-brand cursor-pointer" /></th>
                  <th className="py-3 px-4 font-medium">备案名称</th>
                  <th className="py-3 px-4 font-medium">商品sku</th>
                  <th className="py-3 px-4 font-medium">备案单价</th>
                  <th className="py-3 px-4 font-medium">菜鸟库存</th>
                  <th className="py-3 px-4 font-medium">新增时间</th>
                  <th className="py-3 px-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 placeholder-transparent">
                {[
                  { name: 'LILYSILK真丝衬衫', sku: 'LILYSILK2222', price: '176.00', inventory: '', date: '2026-04-19 11:07' },
                  { name: 'LILYSILK男士睡衣', sku: 'LILYSILK8032', price: '176.00', inventory: '', date: '2026-04-19 11:06' },
                  { name: 'Arc\'teryx男款Granville斜挎包', sku: 'X000009622BLACK', price: '804.00', inventory: '', date: '2026-04-14 17:33' },
                  { name: 'Opening Ceremony男款圆领短袖T恤', sku: 'YMAA001F22JER0061025', price: '1685.00', inventory: '', date: '2026-04-14 16:48' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded text-brand focus:ring-brand accent-brand cursor-pointer" /></td>
                    <td className="py-3 px-4 text-gray-600">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.sku}</td>
                    <td className="py-3 px-4 text-gray-600">{item.price}</td>
                    <td className="py-3 px-4 text-gray-600">{item.inventory}</td>
                    <td className="py-3 px-4 text-gray-500">{item.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-brand">编辑</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-gray-600 hover:text-red-500">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomsOrders = () => {
    return (
      <div className="animate-in fade-in duration-300 h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">订单列表</h2>
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-200 mb-4 flex flex-col gap-4">
            <div className="flex gap-4 items-center flex-wrap">
              <label className="text-sm text-gray-600 whitespace-nowrap">订单编号:</label>
              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:border-brand/40" />
              <label className="text-sm text-gray-600 whitespace-nowrap">支付单状态:</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-brand/40 text-gray-600"><option></option></select>
              <label className="text-sm text-gray-600 whitespace-nowrap">运单状态:</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-brand/40 text-gray-600"><option></option></select>
              <label className="text-sm text-gray-600 whitespace-nowrap">物流通知:</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-brand/40 text-gray-600"><option></option></select>
              <label className="text-sm text-gray-600 whitespace-nowrap">订单状态:</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-brand/40 text-gray-600"><option></option></select>
              <label className="text-sm text-gray-600 whitespace-nowrap">清单状态:</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-brand/40 text-gray-600"><option></option></select>
              <label className="text-sm text-gray-600 whitespace-nowrap mt-2">清单放行通知:</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-brand/40 text-gray-600 mt-2"><option></option></select>
            </div>
            <div className="flex gap-2">
              <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">搜索</button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-1.5 rounded text-sm transition-colors">重置</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-t-sm border border-gray-200 border-b-0 flex gap-2 flex-wrap">
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">推送支付单</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">推送运单</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">推送订单</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">推送清单</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">物流通知</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">清单通知</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">订单导入</button>
             <button className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm transition-colors">订单导出</button>
             <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition-colors">批量删除</button>
          </div>
          
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 font-medium w-10 text-center"><input type="checkbox" className="rounded text-brand focus:ring-brand accent-brand cursor-pointer" /></th>
                  <th className="py-3 px-4 font-medium">通关类型</th>
                  <th className="py-3 px-4 font-medium">订单编号</th>
                  <th className="py-3 px-4 font-medium">订单金额</th>
                  <th className="py-3 px-4 font-medium">仓储/物流</th>
                  <th className="py-3 px-4 font-medium">物流公司名称</th>
                  <th className="py-3 px-4 font-medium">物流单号</th>
                  <th className="py-3 px-4 font-medium">支付单状态</th>
                  <th className="py-3 px-4 font-medium">运单状态</th>
                  <th className="py-3 px-4 font-medium">物流通知</th>
                  <th className="py-3 px-4 font-medium">订单状态</th>
                  <th className="py-3 px-4 font-medium">清单状态</th>
                  <th className="py-3 px-4 font-medium">清单放行通知</th>
                  <th className="py-3 px-4 font-medium">新增时间</th>
                  <th className="py-3 px-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: '2260202604191135415352304', type: '直邮', amount: '485.50', storage: '顺丰直邮', logiName: '顺丰快递', logiNo: 'SF0227352733802', date: '2026-04-19 11:35' },
                  { id: '2260202604182148085161772', type: '直邮', amount: '714.61', storage: '顺丰直邮', logiName: '顺丰快递', logiNo: 'SF5130957954141', date: '2026-04-18 21:48' },
                  { id: '1023202604171013573223897', type: '直邮', amount: '310.94', storage: '顺丰直邮', logiName: '顺丰快递', logiNo: 'SF0225812743949', date: '2026-04-17 10:14' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded text-brand focus:ring-brand accent-brand cursor-pointer" /></td>
                    <td className="py-3 px-4 text-gray-600">{item.type}</td>
                    <td className="py-3 px-4 text-gray-900 font-mono">{item.id}</td>
                    <td className="py-3 px-4 text-gray-600">{item.amount}</td>
                    <td className="py-3 px-4 text-gray-600 leading-tight"><div className="w-16 break-words whitespace-normal">{item.storage}</div></td>
                    <td className="py-3 px-4 text-gray-600">{item.logiName}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{item.logiNo}</td>
                    <td className="py-3 px-4"><span className="text-green-500 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded text-xs">推送成功</span></td>
                    <td className="py-3 px-4"><span className="text-green-500 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded text-xs">推送成功</span></td>
                    <td className="py-3 px-4"><span className="text-green-500 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded text-xs">通知成功</span></td>
                    <td className="py-3 px-4"><span className="text-green-500 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded text-xs">推送成功</span></td>
                    <td className="py-3 px-4"><span className="text-purple-500 border border-purple-200 bg-purple-50 px-1.5 py-0.5 rounded text-xs">不推送</span></td>
                    <td className="py-3 px-4"><span className="text-gray-500 border border-gray-200 bg-gray-50 px-1.5 py-0.5 rounded text-xs">未通知</span></td>
                    <td className="py-3 px-4 text-gray-500 text-center leading-tight whitespace-normal w-24">
                      {item.date.split(' ')[0]}<br/>{item.date.split(' ')[1]}
                    </td>
                    <td className="py-3 px-4">
                       <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-brand">查看</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-gray-600 hover:text-brand">面单</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-gray-600 hover:text-brand">编辑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 text-gray-900 flex flex-col shrink-0">
        <div className="h-16 flex items-center justify-center font-bold text-lg tracking-wider border-b border-gray-200">
          万选商家后台
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {group.title}
              </div>
              <div>
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                        isActive 
                          ? 'bg-gray-100 text-brand font-medium border-r-2 border-brand' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-black' : 'text-gray-400'} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {activeNav === 'merchants' && renderMerchantView()}
        {activeNav === 'miniapps' && renderMiniProgramView()}
        {activeNav === 'public-products' && renderPublicLibraryView()}
        {activeNav === 'hscode' && renderHSCodeView()}
        {activeNav === 'funds' && renderFundsView()}
        {activeNav === 'mapping' && renderCategoryMappingView()}
        {activeNav === 'customs-config' && renderCustomsConfig()}
        {activeNav === 'customs-products' && renderCustomsProducts()}
        {activeNav === 'customs-orders' && renderCustomsOrders()}
      </div>

      {/* --- Modals & Drawers --- */}
      
      {/* Merchant Detail Drawer */}
      {detailDrawer.isOpen && detailDrawer.merchant && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-[800px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-800">{detailDrawer.merchant.name}</h2>
                <Tag color={detailDrawer.merchant.role === '服务商' ? 'blue' : 'orange'}>{detailDrawer.merchant.role}</Tag>
                <span className={`text-xs px-2 py-0.5 rounded-full ${detailDrawer.merchant.status === '运营中' ? 'bg-gray-100 border border-gray-200 text-gray-700' : 'bg-gray-200 text-gray-600'}`}>
                  {detailDrawer.merchant.status}
                </span>
              </div>
              <button onClick={() => setDetailDrawer({isOpen: false, merchant: null, activeTab: 'basic'})} className="text-gray-400 hover:text-gray-600 p-1"><X size={20} /></button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6 pt-2 bg-gray-50">
              {[
                { id: 'basic', label: '基础信息', icon: Store },
                { id: 'miniapp', label: '小程序绑定', icon: AppWindow },
                { id: 'payment', label: '支付配置', icon: CreditCard },
                { id: 'filing', label: '备案配置', icon: FileText },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDetailDrawer(prev => ({...prev, activeTab: tab.id}))}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${
                    detailDrawer.activeTab === tab.id 
                      ? 'border-brand text-brand' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {detailDrawer.activeTab === 'basic' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">基本资料</h3>
                    {!isEditingMerchant ? (
                      <button onClick={() => setIsEditingMerchant(true)} className="text-brand text-sm flex items-center gap-1 hover:underline"><Edit2 size={14}/> 编辑信息</button>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => setIsEditingMerchant(false)} className="text-gray-500 text-sm hover:underline">取消</button>
                        <button onClick={() => setIsEditingMerchant(false)} className="bg-brand text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-brand-hover"><Save size={14}/> 保存</button>
                      </div>
                    )}
                  </div>
                  
                  {isEditingMerchant ? (
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <div>
                        <label className="text-gray-500 block mb-1.5">商家ID (不可修改)</label>
                        <input type="text" disabled value={detailDrawer.merchant.id} className="w-full border border-gray-200 bg-gray-100 rounded px-3 py-2 text-gray-500 font-mono" />
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1.5">登录手机号</label>
                        <input type="text" defaultValue={detailDrawer.merchant.phone} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1.5">商家名称</label>
                        <input type="text" defaultValue={detailDrawer.merchant.name} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1.5">角色类型</label>
                        <select defaultValue={detailDrawer.merchant.role} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none">
                          <option>服务商</option>
                          <option>主理人</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1.5">当前状态</label>
                        <select defaultValue={detailDrawer.merchant.status} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none">
                          <option value="运营中">运营中</option>
                          <option value="已关闭">已关闭</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
                      <div><span className="text-gray-500 block mb-1">商家ID</span><span className="font-mono text-gray-800">{detailDrawer.merchant.id}</span></div>
                      <div><span className="text-gray-500 block mb-1">登录手机号</span><span className="font-mono text-gray-800">{detailDrawer.merchant.phone}</span></div>
                      <div><span className="text-gray-500 block mb-1">商家名称</span><span className="text-gray-800">{detailDrawer.merchant.name}</span></div>
                      <div><span className="text-gray-500 block mb-1">角色类型</span><span className="text-gray-800">{detailDrawer.merchant.role}</span></div>
                      <div><span className="text-gray-500 block mb-1">入驻时间</span><span className="text-gray-800">2026-01-15</span></div>
                      <div><span className="text-gray-500 block mb-1">当前状态</span><span className={detailDrawer.merchant.status === '运营中' ? 'text-gray-700' : 'text-gray-500'}>{detailDrawer.merchant.status}</span></div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">集市业务属性与权限</h3>
                      {(!isEditingMerchant && detailDrawer.merchant.role === '服务商') ? (
                        <button onClick={() => setIsEditingMerchant(true)} className="text-brand text-sm flex items-center gap-1 hover:underline"><Edit2 size={14}/> 编辑权限</button>
                      ) : null}
                    </div>
                    
                    {detailDrawer.merchant.role === '主理人' ? (
                       <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-200">
                         作为主理人角色，集市选品范围继承自上级服务商，此项不可独立设置。
                       </div>
                    ) : (isEditingMerchant && detailDrawer.merchant.role === '服务商') ? (
                      <div className="space-y-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <div>
                          <label className="text-brand font-medium block mb-3 text-sm border-l-2 border-brand pl-2">作为【买方】的集市选品获取范围</label>
                          <div className="flex gap-6 mb-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="radio" name="marketScope" checked={editingMarketScope === '全部集市商品'} onChange={() => setEditingMarketScope('全部集市商品')} className="text-brand focus:ring-brand" />
                              全部集市商品
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="radio" name="marketScope" checked={editingMarketScope === '限定货源'} onChange={() => setEditingMarketScope('限定货源')} className="text-brand focus:ring-brand" />
                              限定货源
                            </label>
                          </div>
                          
                          {editingMarketScope === '限定货源' && (
                            <div className="bg-white p-4 rounded border border-gray-200 animate-in fade-in slide-in-from-top-2">
                              <div className="text-sm text-gray-500 mb-3">配置限定货源组合 (商家ID + 品牌 + 分类)</div>
                              <div className="flex gap-3 items-center mb-3">
                                {/* Merchant Searchable Select */}
                                <div className="relative group">
                                  <div className="flex items-center border border-gray-300 rounded px-2 py-1.5 bg-white w-44 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand cursor-text transition-all">
                                    <Search size={14} className="text-gray-400 mr-1.5 flex-shrink-0" />
                                    <input type="text" placeholder="搜索商家..." className="w-full text-sm outline-none bg-transparent min-w-0 text-gray-700 placeholder:text-gray-400" />
                                    <ChevronDown size={14} className="text-gray-400 ml-1 flex-shrink-0" />
                                  </div>
                                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within:block z-20">
                                    <div className="max-h-48 overflow-y-auto py-1">
                                      <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">1014 - 万选文旅</div>
                                      <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">1023 - 万选奢品全球购</div>
                                      <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">2055 - HAN加盟店</div>
                                    </div>
                                  </div>
                                </div>

                                <span className="text-gray-400">+</span>

                                {/* Brand Searchable Multi-Select */}
                                <div className="relative group">
                                  <div className="flex items-center border border-gray-300 rounded px-2 py-1.5 bg-white w-44 focus-within:border-black focus-within:ring-1 focus-within:ring-black cursor-text transition-all">
                                    <Search size={14} className="text-gray-400 mr-1.5 flex-shrink-0" />
                                    <input type="text" placeholder="搜索品牌(多选)..." className="w-full text-sm outline-none bg-transparent min-w-0 text-gray-700 placeholder:text-gray-400" />
                                    <ChevronDown size={14} className="text-gray-400 ml-1 flex-shrink-0" />
                                  </div>
                                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within:block z-20">
                                    <div className="max-h-48 overflow-y-auto py-1">
                                      <label className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                        <input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /> THE ANDAMANE
                                      </label>
                                      <label className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                        <input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /> GUCCI
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <span className="text-gray-400">+</span>

                                {/* Category Searchable Multi-Select */}
                                <div className="relative group">
                                  <div className="flex items-center border border-gray-300 rounded px-2 py-1.5 bg-white w-44 focus-within:border-black focus-within:ring-1 focus-within:ring-black cursor-text transition-all">
                                    <Search size={14} className="text-gray-400 mr-1.5 flex-shrink-0" />
                                    <input type="text" placeholder="搜索分类(多选)..." className="w-full text-sm outline-none bg-transparent min-w-0 text-gray-700 placeholder:text-gray-400" />
                                    <ChevronDown size={14} className="text-gray-400 ml-1 flex-shrink-0" />
                                  </div>
                                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within:block z-20">
                                    <div className="max-h-48 overflow-y-auto py-1">
                                      <label className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                        <input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /> 服装 &gt; 上衣
                                      </label>
                                      <label className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                        <input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /> 箱包
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <button className="bg-brand text-white hover:bg-brand-hover px-4 py-1.5 rounded text-sm transition-colors font-medium whitespace-nowrap">添加组合</button>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm border border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-gray-500">1014</span>
                                    <span className="text-gray-300">|</span>
                                    <span>THE ANDAMANE</span>
                                    <span className="text-gray-300">|</span>
                                    <span>服装 &gt; 上衣</span>
                                  </div>
                                  <button className="text-brand hover:text-gray-700"><X size={14} /></button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (detailDrawer.merchant.role === '服务商') ? (
                      <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
                        <div>
                          <span className="text-gray-500 block mb-1">作为买方的选品范围</span>
                          <span className="text-gray-800">{detailDrawer.merchant.marketScope || '全部集市商品'}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              {detailDrawer.activeTab === 'miniapp' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">绑定的小程序</h3>
                    <button 
                      onClick={() => { setDetailDrawer(prev => ({...prev, isOpen: false})); setActiveNav('miniapps'); }} 
                      className="text-brand text-sm flex items-center gap-1 hover:underline"
                    >
                      <LinkIcon size={14}/> 前往全局授权管理
                    </button>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 grid grid-cols-2 gap-6 text-sm">
                    <div><span className="text-gray-500 block mb-1.5">AppID</span><span className="font-mono text-gray-800">{detailDrawer.merchant.miniapp?.appId || '未绑定'}</span></div>
                    <div><span className="text-gray-500 block mb-1.5">当前线上版本</span><span className="font-bold text-brand">{detailDrawer.merchant.miniapp?.version || '--'}</span></div>
                    <div><span className="text-gray-500 block mb-1.5">发布状态</span><span className="text-gray-800">{detailDrawer.merchant.miniapp?.status || '--'}</span></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">商家专属快捷操作</h4>
                    <div className="flex flex-wrap gap-3">
                      {['设置店铺代码', '提交审核', '发布', '体验二维码'].map(action => (
                        <button key={action} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:border-brand/40 hover:text-brand transition-colors">
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {detailDrawer.activeTab === 'payment' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">微信支付商户号配置</h3>
                    <button className="text-brand text-sm hover:underline font-medium">修改配置</button>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 grid grid-cols-2 gap-6 text-sm">
                    <div><span className="text-gray-500 block mb-1.5">国内商户号 (MchID)</span><span className="font-mono text-gray-800">{detailDrawer.merchant.payment?.domesticMchId || '未配置'}</span></div>
                    <div><span className="text-gray-500 block mb-1.5">配置状态</span><span className="text-gray-700 font-medium">{detailDrawer.merchant.payment?.status || '未配置'}</span></div>
                    
                    {detailDrawer.merchant.role === '服务商' && (
                      <div className="col-span-2 pt-4 border-t border-gray-200 mt-2">
                        <span className="text-gray-500 block mb-1.5">国际商户号 (Overseas MchID)</span>
                        <span className="font-mono text-gray-800">{detailDrawer.merchant.payment?.internationalMchId || '未配置'}</span>
                      </div>
                    )}
                    
                    <div className="col-span-2 pt-4 border-t border-gray-200 mt-2"><span className="text-gray-500 block mb-1.5">API v3 密钥</span><span className="font-mono text-gray-400 tracking-widest">************************</span></div>
                  </div>
                </div>
              )}
              {detailDrawer.activeTab === 'filing' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">商家独立备案配置</h3>
                    <button className="text-brand text-sm hover:underline font-medium">修改配置</button>
                  </div>
                  <div className="text-sm text-gray-500 bg-brand-light/20 p-3 rounded border border-brand/30 mb-4">
                    在此处配置该商家的专属备案信息。当该商家映射公共库商品时，系统将优先使用此处的配置信息进行海关申报。
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 grid grid-cols-2 gap-6 text-sm">
                    <div><span className="text-gray-500 block mb-1.5">海关备案号</span><span className="font-mono text-gray-800">{detailDrawer.merchant.filing?.customsCode || '未配置'}</span></div>
                    <div><span className="text-gray-500 block mb-1.5">申报口岸</span><span className="text-gray-800">{detailDrawer.merchant.filing?.port || '未配置'}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Merchant Modal */}
      {addModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[500px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-800">{addModal.type === 'provider' ? '新增服务商' : '新增下级商家'}</h3>
              <button onClick={() => setAddModal({isOpen: false, type: 'provider'})} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              {addModal.type === 'sub' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">所属服务商</label>
                  <input type="text" disabled value={mockMerchants.find(m => m.id === addModal.parentId)?.name || ''} className="w-full border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-500" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">商家名称 <span className="text-brand">*</span></label>
                <input type="text" placeholder="请输入商家营业执照名称" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">登录手机号 <span className="text-brand">*</span></label>
                <input type="text" placeholder="11位手机号，将作为该商家的唯一登录账号" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" />
                <p className="text-xs text-gray-400 mt-2 flex items-start gap-1">
                  <span className="text-brand mt-0.5">*</span> 创建成功后，系统将自动发送包含初始密码的短信至该手机号。
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setAddModal({isOpen: false, type: 'provider'})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium">取消</button>
              <button onClick={() => setAddModal({isOpen: false, type: 'provider'})} className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm">确认创建</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Drawer */}
      {productDrawer.isOpen && productDrawer.product && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-[900px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-800">商品详情维护</h2>
                <span className="text-gray-500 font-mono text-sm">货号: {productDrawer.product.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setProductDrawer({isOpen: false, product: null})} className="bg-brand text-white px-4 py-1.5 rounded text-sm hover:bg-brand-hover flex items-center gap-1.5 shadow-sm">
                  <Save size={14} /> 保存修改
                </button>
                <button onClick={() => setProductDrawer({isOpen: false, product: null})} className="text-gray-400 hover:text-gray-600 p-1"><X size={20} /></button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
              
              {/* Section 1: Product Info & Images */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3 mb-5">商品图文信息</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">商品名称</label>
                    <input type="text" defaultValue={productDrawer.product.name} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">品牌</label>
                    <div className="relative group/brand w-full">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-brand focus-within:ring-1 focus-within:ring-brand bg-white cursor-text w-full transition-all">
                        <Search size={14} className="text-gray-400 mr-2 shrink-0" />
                        <input type="text" placeholder="搜索品牌..." defaultValue={productDrawer.product.brand} className="w-full outline-none bg-transparent min-w-0" />
                        <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                      </div>
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within/brand:block z-20">
                         <div className="max-h-48 overflow-y-auto py-1">
                             {brands.map(b => (
                               <label key={b.id} className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                 <input type="radio" name="editProductBrand" defaultChecked={b.name === productDrawer.product.brand} className="text-brand focus:ring-brand" /> {b.name}
                               </label>
                             ))}
                         </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">分类</label>
                    <div className="relative group/category w-full">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-brand focus-within:ring-1 focus-within:ring-brand bg-white cursor-text w-full transition-all">
                        <Search size={14} className="text-gray-400 mr-2 shrink-0" />
                        <input type="text" placeholder="搜索分类..." defaultValue={productDrawer.product.category} className="w-full outline-none bg-transparent min-w-0" />
                        <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                      </div>
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within/category:block z-20">
                         <div className="max-h-56 overflow-y-auto py-1">
                             {categories.map(c => (
                               <div key={c.id}>
                                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">{c.name}</div>
                                  {c.children.map(child => (
                                    <label key={child.id} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer gap-2 text-gray-700">
                                      <input type="radio" name="editProductCategory" defaultChecked={child.name === productDrawer.product.category} className="text-brand focus:ring-brand" /> {child.name}
                                    </label>
                                  ))}
                               </div>
                             ))}
                         </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">官方指导价</label>
                    <input type="text" defaultValue={productDrawer.product.price} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-500 block mb-2 text-sm">商品主图 (含细节图)</label>
                    <div className="flex gap-3 flex-wrap">
                      {productDrawer.product.images.main.map((img: string, idx: number) => (
                        <div key={idx} className="relative w-20 h-20 border border-gray-200 rounded overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                            <button className="text-white hover:text-red-400"><X size={16} /></button>
                          </div>
                        </div>
                      ))}
                      <button className="w-20 h-20 border border-gray-300 border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-brand/40 transition-colors bg-gray-50">
                        <Plus size={20} />
                        <span className="text-xs mt-1">上传</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-2 text-sm">开箱/穿搭图</label>
                    <div className="flex gap-3 flex-wrap">
                      {productDrawer.product.images.lifestyle.map((img: string, idx: number) => (
                        <div key={idx} className="relative w-20 h-20 border border-gray-200 rounded overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                            <button className="text-white hover:text-red-400"><X size={16} /></button>
                          </div>
                        </div>
                      ))}
                      <button className="w-20 h-20 border border-gray-300 border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-brand/40 transition-colors bg-gray-50">
                        <Plus size={20} />
                        <span className="text-xs mt-1">上传</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Filing Info */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">海关备案信息</h3>
                  <button className="text-brand border border-brand hover:bg-brand-light/20 px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors">
                    <ShieldCheck size={14} /> 重新发起备案
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">HS Code</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.hsCode} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none font-mono" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">净重 (kg)</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.netWeight} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">毛重 (kg)</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.grossWeight} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第一计量单位</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.unit1} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第一计量数量</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.qty1} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">常用单位</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.commonUnit} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第二计量单位</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.unit2} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第二计量数量</label>
                    <input type="text" defaultValue={productDrawer.product.filingInfo.qty2} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="col-span-3">
                    <label className="text-gray-500 block mb-1.5 text-sm">当前备案状态</label>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${productDrawer.product.filingInfo.status === '已备案' ? 'bg-gray-100 border border-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>
                        {productDrawer.product.filingInfo.status}
                      </span>
                      <span className="text-xs text-gray-400">最后更新于 2026-04-08 10:00:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: SKU & Tax */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">SKU与税率配置</h3>
                  <button className="text-brand hover:underline text-sm flex items-center gap-1">
                    <Plus size={14} /> 添加SKU
                  </button>
                </div>
                <table className="w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">规格/含量</th>
                      <th className="py-2.5 px-4 font-medium">执行税率</th>
                      <th className="py-2.5 px-4 font-medium text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productDrawer.product.skus.map((sku: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <input type="text" defaultValue={sku.spec} className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:border-brand/40 outline-none" />
                        </td>
                        <td className="py-2 px-4">
                          <select defaultValue={sku.taxRate} className="border border-gray-300 rounded px-2 py-1 text-sm focus:border-brand/40 outline-none">
                            <option value="9.1%">9.1%</option>
                            <option value="23.1%">23.1%</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="text-brand hover:text-gray-700 text-sm">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-3">
                  * 提示：美妆等特殊商品，不同含量可能对应不同的消费税率，请根据实际情况为每个SKU单独配置税率。
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* Add Product Drawer */}
      {addProductDrawer.isOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-[900px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-800">新增公共 SPU</h2>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setAddProductDrawer({isOpen: false})} className="bg-brand text-white px-4 py-1.5 rounded text-sm hover:bg-brand-hover flex items-center gap-1.5 shadow-sm">
                  <Plus size={14} /> 创建 SPU
                </button>
                <button onClick={() => setAddProductDrawer({isOpen: false})} className="text-gray-400 hover:text-gray-600 p-1"><X size={20} /></button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
              
              {/* Section 1: Product Info & Images */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3 mb-5">商品图文信息</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">商品名称</label>
                    <input type="text" placeholder="请输入商品名称" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">品牌</label>
                    <div className="relative group/brandnew w-full">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black bg-white cursor-text w-full transition-all">
                        <Search size={14} className="text-gray-400 mr-2 shrink-0" />
                        <input type="text" placeholder="搜索品牌..." className="w-full outline-none bg-transparent min-w-0" />
                        <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                      </div>
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within/brandnew:block z-20">
                         <div className="max-h-48 overflow-y-auto py-1">
                             {brands.map(b => (
                               <label key={b.id} className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                 <input type="radio" name="newProductBrand" className="text-brand focus:ring-brand" /> {b.name}
                               </label>
                             ))}
                         </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">分类</label>
                    <div className="relative group/categorynew w-full">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black bg-white cursor-text w-full transition-all">
                        <Search size={14} className="text-gray-400 mr-2 shrink-0" />
                        <input type="text" placeholder="搜索分类..." className="w-full outline-none bg-transparent min-w-0" />
                        <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                      </div>
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within/categorynew:block z-20">
                         <div className="max-h-56 overflow-y-auto py-1">
                             {categories.map(c => (
                               <div key={c.id}>
                                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">{c.name}</div>
                                  {c.children.map(child => (
                                    <label key={child.id} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer gap-2 text-gray-700">
                                      <input type="radio" name="newProductCategory" className="text-brand focus:ring-brand" /> {child.name}
                                    </label>
                                  ))}
                               </div>
                             ))}
                         </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">官方指导价</label>
                    <input type="text" placeholder="请输入官方指导价" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-500 block mb-2 text-sm">商品主图 (含细节图)</label>
                    <div className="flex gap-3 flex-wrap">
                      <button className="w-20 h-20 border border-gray-300 border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-brand/40 transition-colors bg-gray-50">
                        <Plus size={20} />
                        <span className="text-xs mt-1">上传</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-2 text-sm">开箱/穿搭图</label>
                    <div className="flex gap-3 flex-wrap">
                      <button className="w-20 h-20 border border-gray-300 border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-brand/40 transition-colors bg-gray-50">
                        <Plus size={20} />
                        <span className="text-xs mt-1">上传</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Filing Info */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">海关备案信息</h3>
                  <span className="text-xs text-gray-400">选择分类后将自动带入默认备案信息</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">HS Code</label>
                    <input type="text" placeholder="自动带入或手动输入" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none font-mono" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">净重 (kg)</label>
                    <input type="text" placeholder="请输入净重" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">毛重 (kg)</label>
                    <input type="text" placeholder="请输入毛重" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第一计量单位</label>
                    <input type="text" placeholder="自动带入或手动输入" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第一计量数量</label>
                    <input type="text" placeholder="请输入数量" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">常用单位</label>
                    <input type="text" placeholder="自动带入或手动输入" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第二计量单位</label>
                    <input type="text" placeholder="自动带入或手动输入" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1.5 text-sm">第二计量数量</label>
                    <input type="text" placeholder="请输入数量" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand/40 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>

              {/* Section 3: SKU & Tax */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">SKU与税率配置</h3>
                  <button className="text-brand hover:underline text-sm flex items-center gap-1">
                    <Plus size={14} /> 添加SKU
                  </button>
                </div>
                <table className="w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">规格/含量</th>
                      <th className="py-2.5 px-4 font-medium">执行税率</th>
                      <th className="py-2.5 px-4 font-medium text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-4">
                        <input type="text" placeholder="例如: 默认规格" className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:border-brand/40 outline-none" />
                      </td>
                      <td className="py-2 px-4">
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:border-brand/40 outline-none">
                          <option value="9.1%">9.1%</option>
                          <option value="23.1%">23.1%</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 text-right">
                        <button className="text-brand hover:text-gray-700 text-sm">删除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* Filing Modal */}
      {filingModal.isOpen && filingModal.product && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[800px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-800">修改商品备案信息</h3>
              <button onClick={() => setFilingModal({isOpen: false, product: null})} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-6 flex items-center gap-4 bg-brand-light/20 p-4 rounded-lg border border-brand/30">
                <img src={filingModal.product.image} alt="" className="w-16 h-16 rounded object-cover border border-gray-200" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-medium text-gray-800 mb-1">{filingModal.product.name}</div>
                  <div className="text-sm text-gray-500 font-mono">货号: {filingModal.product.id}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">HS Code</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.hsCode} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none font-mono" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">净重 (kg)</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.netWeight} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">毛重 (kg)</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.grossWeight} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">第一计量单位</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.unit1} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">第一计量数量</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.qty1} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">常用单位</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.commonUnit} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">第二计量单位</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.unit2} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1.5 text-sm">第二计量数量</label>
                  <input type="text" defaultValue={filingModal.product.filingInfo.qty2} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setFilingModal({isOpen: false, product: null})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium">取消</button>
              <button onClick={() => setFilingModal({isOpen: false, product: null})} className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm flex items-center gap-2">
                <Save size={14} /> 保存并重新备案
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Topup Modal */}
      {topupModal.isOpen && topupModal.merchant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[600px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
              <h3 className="font-semibold text-lg text-black">账户充值</h3>
              <button onClick={() => setTopupModal({isOpen: false, merchant: null})} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-6 flex justify-between items-center bg-gray-50 text-black p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">充值商家</span>
                  <span className="font-bold text-base">{topupModal.merchant.name}</span>
                </div>
                <button onClick={() => { setTopupModal({isOpen: false, merchant: null}); setActiveNav('funds'); setFundsTab('service'); }} className="text-gray-500 hover:text-black hover:underline text-sm flex items-center gap-1 transition-colors">
                  资金对账中心 <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 text-gray-700 p-3 rounded-md text-sm flex gap-2 items-start border border-gray-200">
                  <Info size={16} className="mt-0.5 flex-shrink-0" />
                  <p>海外分账需商家提交保证金，用于货款抵扣，税运抵扣等操作。</p>
                </div>

                <div>
                  <label className="text-black font-medium block mb-3 text-sm">充值金额 <span className="text-brand">*</span></label>
                  <div className="relative">
                     <input type="number" placeholder="请输入充值总额 (港币)" className="border border-gray-300 rounded-md py-3 px-4 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none w-full transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-black font-medium block mb-3 text-sm">上传充值/调账凭证 <span className="text-brand">*</span></label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50">
                    <div className="bg-white border border-gray-200 text-black p-3 rounded-full mb-3 shadow-sm hover:border-brand transition-colors">
                      <svg className="w-5 h-5 group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <div className="text-black text-sm font-medium mb-1">点击或将对账水单拖拽到这里</div>
                    <div className="text-gray-400 text-xs">支持 JPG, PNG, PDF 格式</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setTopupModal({isOpen: false, merchant: null})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium border border-gray-300 bg-white">取消</button>
              <button onClick={() => setTopupModal({isOpen: false, merchant: null})} className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm">
                确定充值
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Brand Modal */}
      {brandModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[500px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
              <h3 className="font-semibold text-lg text-black">{brandModal.brand ? '编辑品牌' : '新增品牌'}</h3>
              <button onClick={() => setBrandModal({isOpen: false, brand: null})} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="text-black font-medium block mb-2 text-sm">品牌名称 <span className="text-brand">*</span></label>
                <input 
                  type="text" 
                  defaultValue={brandModal.brand?.name || ''} 
                  id="brandNameInput"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
                  placeholder="输入品牌名称" 
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setBrandModal({isOpen: false, brand: null})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium border border-gray-300 bg-white">取消</button>
              <button 
                onClick={() => {
                  const val = (document.getElementById('brandNameInput') as HTMLInputElement).value;
                  if (!val) return;
                  if (brandModal.brand) {
                    setBrands(brands.map(b => b.id === brandModal.brand.id ? { ...b, name: val } : b));
                  } else {
                    setBrands([...brands, { id: `B${Date.now()}`, name: val, spuCount: 0 }]);
                  }
                  setBrandModal({isOpen: false, brand: null});
                }} 
                className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {categoryModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[500px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
              <h3 className="font-semibold text-lg text-black">
                {categoryModal.category ? '编辑分类' : categoryModal.parentId ? '新增子分类' : '新增一级分类'}
              </h3>
              <button onClick={() => setCategoryModal({isOpen: false, category: null})} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="text-black font-medium block mb-2 text-sm">分类名称 <span className="text-brand">*</span></label>
                <input 
                  type="text" 
                  defaultValue={categoryModal.category?.name || ''} 
                  id="categoryNameInput"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
                  placeholder="输入分类名称" 
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setCategoryModal({isOpen: false, category: null})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium border border-gray-300 bg-white">取消</button>
              <button 
                onClick={() => {
                  const val = (document.getElementById('categoryNameInput') as HTMLInputElement).value;
                  if (!val) return;
                  if (categoryModal.category) {
                    setCategories(categories.map(c => {
                      if (c.id === categoryModal.category.id) return { ...c, name: val };
                      if (c.children) {
                        return { ...c, children: c.children.map(ch => ch.id === categoryModal.category.id ? { ...ch, name: val } : ch) };
                      }
                      return c;
                    }));
                  } else if (categoryModal.parentId) {
                    setCategories(categories.map(c => {
                      if (c.id === categoryModal.parentId) {
                        return { ...c, children: [...(c.children || []), { id: `C${Date.now()}`, name: val, level: 2, hasFiling: false, spuCount: 0 }] };
                      }
                      return c;
                    }));
                  } else {
                    setCategories([...categories, { id: `C${Date.now()}`, name: val, level: 1, hasFiling: false, spuCount: 0, children: [] }]);
                  }
                  setCategoryModal({isOpen: false, category: null});
                }} 
                className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Migrate Modal */}
      {migrateModal.isOpen && migrateModal.source && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[500px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
              <h3 className="font-semibold text-lg text-black">迁移商品 ({migrateModal.type === 'brand' ? '品牌' : '分类'})</h3>
              <button onClick={() => setMigrateModal({isOpen: false, source: null, type: 'brand'})} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 text-gray-700 p-3 rounded-md text-sm flex gap-2 items-start border border-gray-200 mb-6">
                <Info size={16} className="mt-0.5 flex-shrink-0" />
                <p>将当前【{migrateModal.source.name}】下的 <span className="font-bold text-black">{migrateModal.source.spuCount}</span> 个 SPU 迁移至新的目标位置。</p>
              </div>

              <div className="mb-4">
                <label className="text-black font-medium block mb-2 text-sm">目标选择 <span className="text-brand">*</span></label>
                <select id="migrateTargetSelect" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-black outline-none transition-all appearance-none cursor-pointer bg-white">
                  <option value="">{migrateModal.type === 'brand' ? '请选择目标品牌...' : '请选择目标分类...'}</option>
                  {migrateModal.type === 'brand' ? (
                    brands.filter(b => b.id !== migrateModal.source.id).map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))
                  ) : (
                    categories.map(c => (
                      <optgroup key={c.id} label={c.name}>
                        <option value={c.id} disabled={c.id === migrateModal.source.id}>{c.name}</option>
                        {c.children.map(ch => (
                          <option key={ch.id} value={ch.id} disabled={ch.id === migrateModal.source.id}>-- {ch.name}</option>
                        ))}
                      </optgroup>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setMigrateModal({isOpen: false, source: null, type: 'brand'})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium border border-gray-300 bg-white">取消</button>
              <button 
                onClick={() => {
                  const selectEl = document.getElementById('migrateTargetSelect') as HTMLSelectElement;
                  const targetId = selectEl?.value;
                  if (!targetId) return;

                  const spuCountToMove = parseInt(migrateModal.source.spuCount, 10);

                  if (migrateModal.type === 'brand') {
                    setBrands(brands.map(b => {
                      if (b.id === migrateModal.source.id) return { ...b, spuCount: 0 };
                      if (b.id === targetId) return { ...b, spuCount: b.spuCount + spuCountToMove };
                      return b;
                    }));
                  } else {
                    setCategories(categories.map(c => {
                      let newCat = { ...c };
                      if (newCat.id === migrateModal.source.id) newCat.spuCount = 0;
                      if (newCat.id === targetId) newCat.spuCount = newCat.spuCount + spuCountToMove;
                      
                      if (newCat.children) {
                        newCat.children = newCat.children.map(ch => {
                          if (ch.id === migrateModal.source.id) return { ...ch, spuCount: 0 };
                          if (ch.id === targetId) return { ...ch, spuCount: ch.spuCount + spuCountToMove };
                          return ch;
                        });
                      }
                      return newCat;
                    }));
                  }

                  setMigrateModal({isOpen: false, source: null, type: 'brand'});
                }} 
                className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm"
              >
                确认迁移
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Review App Modal */}
      {reviewAppModal.isOpen && reviewAppModal.app && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[900px] max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80 shrink-0">
              <h3 className="font-semibold text-lg text-black">审核并新建公共SPU</h3>
              <button 
                onClick={() => { setReviewAppModal({isOpen: false, app: null}); setDupeCheckState('idle'); }} 
                className="text-gray-400 hover:text-black transition-colors"
                title="关闭"
              ><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex gap-6">
              {/* Left Column: Merchant Submitted Info */}
              <div className="w-[45%] flex flex-col gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-black mb-3 text-sm flex items-center gap-2">
                    <Store size={14} className="text-gray-500" /> 提报商家: {reviewAppModal.app.merchant}
                  </h4>
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden border border-gray-300">
                     <span className="text-gray-400 text-sm">暂无实景图</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-500 text-xs block mb-1">提报商品名称</span>
                      <div className="text-sm text-black font-medium">{reviewAppModal.app.name}</div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs block mb-1">建议品牌</span>
                        <div className="text-sm text-black">{reviewAppModal.app.refBrand}</div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs block mb-1">建议分类</span>
                        <div className="text-sm text-black">{reviewAppModal.app.refCategory}</div>
                    </div>
                  </div>
                </div>

                {/* Duplication Check Area */}
                <div className="bg-brand-light/20/50 p-4 rounded-lg border border-brand/30">
                  <h4 className="font-medium text-brand mb-2 text-sm flex items-center gap-1.5">
                    <Search size={14} /> 库内查重分析
                  </h4>
                  <div className="text-xs text-brand mb-3 leading-relaxed">
                    为了防止公共库内存在重复商品，系统会基于品牌、分类和词条提取分析库内相似的SPU。
                  </div>
                  {dupeCheckState === 'idle' && (
                    <button 
                      onClick={() => {
                        setDupeCheckState('checking');
                        setTimeout(() => setDupeCheckState(Math.random() > 0.5 ? 'found' : 'clean'), 1000);
                      }}
                      className="w-full bg-white border border-brand/30 text-brand hover:bg-brand-light/20 py-2 rounded-md transition-colors text-sm font-medium shadow-sm"
                    >
                      一键分析查重
                    </button>
                  )}
                  {dupeCheckState === 'checking' && (
                    <button disabled className="w-full bg-white border border-brand/30 text-brand py-2 rounded-md text-sm font-medium shadow-sm flex justify-center items-center gap-2 cursor-not-allowed">
                      <div className="w-4 h-4 border-2 border-brand/40 border-t-transparent rounded-full animate-spin"></div> 分析中...
                    </button>
                  )}
                  {dupeCheckState === 'clean' && (
                    <div className="mt-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded border border-gray-200 flex items-center gap-2 font-medium">
                      <ShieldCheck size={16} /> 未发现高度相似商品，推荐新建。
                    </div>
                  )}
                  {dupeCheckState === 'found' && (
                    <div className="mt-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded border border-gray-200 flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-medium">
                        <AlertTriangle size={16} /> 发现 1 个相似公共 SPU
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-300">
                        <div className="font-medium text-gray-800 text-xs">ROLEX 劳力士潜航者型系列</div>
                        <div className="text-gray-500 text-[10px] mt-0.5">SPU ID: SPU10029384</div>
                        <button className="text-brand hover:underline text-xs mt-1 block w-full text-left">
                          查看详情并比对
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                           setReviewAppModal({isOpen: false, app: null});
                           setDupeCheckState('idle');
                        }}
                        className="w-full bg-gray-800 text-white hover:bg-gray-900 py-1.5 rounded transition-colors text-xs font-medium shadow-sm mt-1"
                      >
                        驳回申请并快捷映射至此 SPU
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Editable Public SPU configuration */}
              <div className="w-[55%] flex flex-col gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-5 relative">
                   <div className="absolute top-0 right-0 bg-brand text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-medium">目标公共库 SPU</div>
                   <div className="space-y-4">
                      <div>
                        <label className="text-black font-medium block mb-1.5 text-sm">标准商品名称 <span className="text-brand">*</span></label>
                        <input type="text" defaultValue={reviewAppModal.app.name} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-black outline-none transition-colors" />
                        <span className="text-gray-400 text-xs mt-1 block">编辑修整，去除冗余描述。</span>
                      </div>
                      
                      <div>
                        <label className="text-black font-medium block mb-1.5 text-sm">绑定公共品牌 <span className="text-brand">*</span></label>
                        <div className="relative group/brandnew w-full">
                          <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black bg-white cursor-text w-full transition-all">
                            <Search size={14} className="text-gray-400 mr-2 shrink-0" />
                            <input type="text" placeholder="搜索系统品牌..." className="w-full outline-none bg-transparent min-w-0" defaultValue={reviewAppModal.app.refBrand} />
                            <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                          </div>
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within/brandnew:block z-20">
                             <div className="max-h-48 overflow-y-auto py-1">
                                 {brands.map(b => (
                                   <label key={b.id} className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer gap-2 text-gray-700">
                                     <input type="radio" name="reviewProductBrand" className="text-brand focus:ring-brand" defaultChecked={b.name === reviewAppModal.app.refBrand} /> {b.name}
                                   </label>
                                 ))}
                             </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-black font-medium block mb-1.5 text-sm">绑定公共分类 <span className="text-brand">*</span></label>
                        <div className="relative group/catnew w-full">
                          <div className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black bg-white cursor-text w-full transition-all">
                            <Search size={14} className="text-gray-400 mr-2 shrink-0" />
                            <input type="text" placeholder="搜索系统分类..." className="w-full outline-none bg-transparent min-w-0" />
                            <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                          </div>
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg hidden group-focus-within/catnew:block z-20">
                             <div className="max-h-56 overflow-y-auto py-1">
                                 {categories.map(c => (
                                   <div key={c.id}>
                                      <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">{c.name}</div>
                                      {c.children.map(child => (
                                        <label key={child.id} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer gap-2 text-gray-700">
                                          <input type="radio" name="reviewProductCategory" className="text-brand focus:ring-brand" /> {child.name}
                                        </label>
                                      ))}
                                   </div>
                                 ))}
                             </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-black font-medium block mb-1.5 text-sm">统一指导价 (可选)</label>
                        <input type="text" placeholder="设置此款商品的基础价格指导" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-black outline-none transition-colors" />
                      </div>
                   </div>
                </div>
              </div>

            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between gap-3 shrink-0">
               <button onClick={() => { setReviewAppModal({isOpen: false, app: null}); setDupeCheckState('idle'); }} className="px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium border border-gray-200 bg-white">驳回申请</button>
               <div className="space-x-3">
                 <button onClick={() => { setReviewAppModal({isOpen: false, app: null}); setDupeCheckState('idle'); }} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium border border-gray-300 bg-white">取消</button>
                 <button onClick={() => { setReviewAppModal({isOpen: false, app: null}); setDupeCheckState('idle'); }} className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm">
                   建品并同意
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
      {/* Dedupe Center Modal */}
      {dedupeModal.isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
             <div className="flex items-center gap-3">
                <button onClick={() => setDedupeModal({isOpen: false})} className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-600">
                  <X size={20} />
                </button>
                <h3 className="font-semibold text-lg text-black flex items-center gap-2">
                   <AlertTriangle className="text-brand" size={18} />
                   SPU 去重治理中心
                </h3>
             </div>
             <div className="flex items-center gap-4 text-sm">
                <div className="text-gray-500">发现 <span className="text-brand font-bold">142</span> 个疑似重复分组</div>
                <button className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-hover transition-colors shadow-sm">
                  一键重新扫描全库
                </button>
             </div>
          </div>
          
          <div className="flex-1 overflow-hidden flex bg-gray-50">
             {/* Left side: Group List */}
             <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col shrink-0">
                <div className="p-4 border-b border-gray-100 flex gap-2">
                   <div className="relative flex-1">
                      <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="text" placeholder="搜索模型分组号或关键词" className="w-full border border-gray-300 rounded px-3 py-2 pl-9 text-sm focus:border-brand focus:ring-1 focus:ring-black outline-none transition-colors" />
                   </div>
                   <button className="border border-gray-300 px-3 rounded text-gray-600 hover:bg-gray-50 transition-colors">
                      <Filter size={14} />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto w-full p-3 space-y-2">
                   {[
                     { id: 'GRP-20419', title: 'ROLEX 极度相似', count: 3, score: 99, active: true },
                     { id: 'GRP-20418', title: 'Nike 短袖 T恤 多种表述', count: 5, score: 94, active: false },
                     { id: 'GRP-20417', title: 'Coach 蔻驰单肩包', count: 2, score: 87, active: false },
                   ].map(grp => (
                     <div key={grp.id} className={`p-4 rounded-lg cursor-pointer transition-colors border ${grp.active ? 'bg-brand-light/20 border-brand/30 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex justify-between items-start mb-2">
                           <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${grp.active ? 'bg-brand-light/40 text-brand' : 'bg-gray-100 text-gray-500'}`}>{grp.id}</span>
                           <span className="text-xs text-brand font-medium bg-brand-light/30 px-1.5 py-0.5 rounded">置信度 {grp.score}%</span>
                        </div>
                        <div className={`font-medium text-sm mb-1 ${grp.active ? 'text-brand' : 'text-black'}`}>{grp.title}</div>
                        <div className="text-xs text-gray-500">检测到 {grp.count} 个互斥 SPU 条目</div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Right side: Detail Comparison */}
             <div className="flex-1 flex flex-col min-w-0">
                <div className="p-6 overflow-y-auto flex-1">
                   <div className="mb-4">
                      <h2 className="text-xl font-bold text-black flex items-center gap-2">
                         分组 GRP-20419 <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded">建议合并动作</span>
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">请从下列 SPU 中选择一个作为<strong>主商品保留</strong>，其他商品将被注销，相关历史商家绑定将自动迁移至主商品。</p>
                   </div>
                   
                   <div className="flex flex-col gap-3 overflow-y-auto pb-4 pr-2">
                      {/* SPU Item 1 */}
                      <div className="w-full bg-white border-2 border-brand rounded-xl overflow-hidden shadow-sm relative flex items-stretch">
                         <div className="absolute top-0 right-0 bg-brand text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-medium">主被选商品</div>
                         <div className="p-4 flex items-center w-full gap-4">
                            <label className="flex items-center gap-2 cursor-pointer font-medium text-black w-28 shrink-0">
                               <input type="radio" name="master_spu" className="text-brand focus:ring-brand w-4 h-4" defaultChecked />
                               设为主保留
                            </label>
                            
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-1 shrink-0">
                               <img src="https://picsum.photos/seed/rolex1/400/400" className="w-full h-full object-contain mix-blend-multiply" alt="手表" />
                            </div>
                            
                            <div className="flex-1 min-w-0 pr-8">
                               <div className="text-gray-400 text-[10px] font-mono mb-0.5">ID: SPU10029384</div>
                               <div className="font-semibold text-black text-sm line-clamp-1 mb-2">ROLEX 劳力士潜航者型系列绿水鬼</div>
                               <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span><span className="text-gray-400 mr-1">品牌:</span><span className="text-black">ROLEX</span></span>
                                  <span><span className="text-gray-400 mr-1">分类:</span><span className="text-black">钟表 &gt; 腕表</span></span>
                                  <span className="bg-brand-light/30 text-brand px-2 py-0.5 rounded font-medium">引用商家: 38 家</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* SPU Item 2 */}
                      <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative flex items-stretch bg-gray-50/50 opacity-60 hover:opacity-100 transition-opacity">
                         <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-bl-lg font-medium">待合并注销</div>
                         <div className="p-4 flex items-center w-full gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-500 w-28 shrink-0">
                               <input type="radio" name="master_spu" className="text-brand focus:ring-brand w-4 h-4" />
                               设为主保留
                            </label>
                            
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-1 shrink-0">
                               <img src="https://picsum.photos/seed/rolex2/400/400" className="w-full h-full object-contain mix-blend-multiply" alt="手表" />
                            </div>
                            
                            <div className="flex-1 min-w-0 pr-8">
                               <div className="text-gray-400 text-[10px] font-mono mb-0.5">ID: SPU10029881</div>
                               <div className="font-medium text-gray-800 text-sm line-clamp-1 mb-2">Rolex 劳力士 126610LV 机械男表 绿圈</div>
                               <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span><span className="text-gray-400 mr-1">品牌:</span><span className="text-black">劳力士</span></span>
                                  <span><span className="text-gray-400 mr-1">分类:</span><span className="text-black">男装表</span></span>
                                  <span className="bg-brand-light/30 text-brand px-2 py-0.5 rounded font-medium">引用商家: 5 家</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* SPU Item 3 */}
                      <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative flex items-stretch bg-gray-50/50 opacity-60 hover:opacity-100 transition-opacity">
                         <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-bl-lg font-medium">待合并注销</div>
                         <div className="p-4 flex items-center w-full gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-500 w-28 shrink-0">
                               <input type="radio" name="master_spu" className="text-brand focus:ring-brand w-4 h-4" />
                               设为主保留
                            </label>
                            
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-1 shrink-0">
                               <div className="text-gray-400 text-xs">无图片</div>
                            </div>
                            
                            <div className="flex-1 min-w-0 pr-8">
                               <div className="text-gray-400 text-[10px] font-mono mb-0.5">ID: SPU10034509</div>
                               <div className="font-medium text-gray-800 text-sm line-clamp-1 mb-2">正品劳力士水鬼</div>
                               <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span><span className="text-gray-400 mr-1">品牌:</span><span className="text-gray-400 italic">未分类</span></span>
                                  <span><span className="text-gray-400 mr-1">分类:</span><span className="text-gray-400 italic">未分类</span></span>
                                  <span className="bg-brand-light/30 text-brand px-2 py-0.5 rounded font-medium">引用商家: 1 家</span>
                               </div>
                            </div>
                         </div>
                      </div>

                   </div>
                </div>
                
                {/* Fixed bottom action bar */}
                <div className="bg-white border-t border-gray-200 p-5 flex justify-between items-center shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-10 w-full">
                   <div className="flex gap-4 items-center">
                      <button className="text-gray-600 border border-gray-300 hover:bg-gray-100 px-5 py-2.5 rounded-md text-sm font-medium transition-colors bg-white">
                         跳过此组
                      </button>
                      <button className="text-gray-600 hover:underline px-2 text-sm font-medium">
                         标记为非重复 (打散解绑)
                      </button>
                   </div>
                   <button 
                     onClick={() => setDedupeModal({isOpen: false})}
                     className="bg-brand hover:bg-brand-hover text-white px-8 py-2.5 rounded-md transition-colors text-sm font-medium shadow-md flex items-center gap-2"
                   >
                      <CheckCircle size={16} />
                      确认合并 2 项至选定主商品
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Customs Wechat Config Modal */}
      {customsWechatConfigModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-in fade-in duration-200">
           <div className="bg-white rounded-lg shadow-xl w-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                 <h3 className="text-lg font-semibold">微信报关配置</h3>
                 <button onClick={() => setCustomsWechatConfigModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto" style={{maxHeight: '70vh'}}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">微信公众号appid:</label>
                    <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">微信支付商户号:</label>
                    <input type="text" defaultValue="1681958226" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">API密钥key:</label>
                    <input type="password" defaultValue="Shanghai123..." className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">海关电商编号:</label>
                    <input type="text" defaultValue="3117960D7V" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">默认申报口岸代码:</label>
                    <input type="text" defaultValue="NINGBO" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-5 flex justify-end gap-3 bg-gray-50/50">
                 <button onClick={() => setCustomsWechatConfigModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">取消</button>
                 <button onClick={() => setCustomsWechatConfigModal(false)} className="px-4 py-2 bg-brand text-white rounded text-sm hover:bg-brand-hover transition-colors">确定</button>
              </div>
           </div>
        </div>
      )}

      {/* Customs SF Config Modal */}
      {customsSFConfigModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-in fade-in duration-200">
           <div className="bg-white rounded-lg shadow-xl w-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                 <h3 className="text-lg font-semibold">顺丰直邮报关配置</h3>
                 <button onClick={() => setCustomsSFConfigModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto" style={{maxHeight: '70vh'}}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">appKey:</label>
                    <input type="text" defaultValue="33B64944FF6ba1710dc59290d3350e02" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">appSecret:</label>
                    <input type="password" defaultValue="0103c12cd3c5ddca3790693d1bc6b571" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">aesKey:</label>
                    <input type="password" defaultValue="CTUCJ78Q4534g3T4g25K12" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">apiUsername:</label>
                    <input type="text" defaultValue="LUXEPORTER" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">客户编码:</label>
                    <input type="text" defaultValue="ICRM005J8H70" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">国际产品映射码:</label>
                    <input type="text" defaultValue="INT0009" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">月结卡号:</label>
                    <input type="text" defaultValue="853298735" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">电商平台名称:</label>
                    <input type="text" defaultValue="上海斐宁唯选供应链有限公司" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-right text-sm text-gray-700">电商平台编号:</label>
                    <input type="text" defaultValue="3117960D7V" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/40" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-5 flex justify-end gap-3 bg-gray-50/50">
                 <button onClick={() => setCustomsSFConfigModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">取消</button>
                 <button onClick={() => setCustomsSFConfigModal(false)} className="px-4 py-2 bg-brand text-white rounded text-sm hover:bg-brand-hover transition-colors">确定</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
