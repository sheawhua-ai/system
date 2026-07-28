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
  Plane,
  Receipt,
  Wallet,
  Coins,
  Upload,
  Download,
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  DollarSign,
  History,
  Truck,
  ArrowDownRight,
  ArrowUpRight
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

// --- SF & Service Account Mock Data ---
const initialSfWaybillBills = [
  {
    id: 'SFB20260718001',
    merchantId: '1014',
    merchantName: '万选文旅',
    orderId: 'OD20240419113',
    payId: 'P20240419113941',
    waybillNo: 'SF168800928311',
    billingMonth: '2026-07',
    shipDate: '2026-07-18 10:22',
    customsPort: '宁波海关 (BC直邮)',
    tax: 54.00,
    freight: 45.00,
    totalCost: 99.00,
    status: '已结清',
    deductSource: '服务账户余额',
    notes: '自动预扣扣减成功'
  },
  {
    id: 'SFB20260718002',
    merchantId: '1014',
    merchantName: '万选文旅',
    orderId: 'OD20240414166',
    payId: 'P20240416481294',
    waybillNo: 'SF168800928312',
    billingMonth: '2026-07',
    shipDate: '2026-07-17 14:10',
    customsPort: '宁波海关 (BC直邮)',
    tax: 90.50,
    freight: 45.00,
    totalCost: 135.50,
    status: '已结清',
    deductSource: '服务账户余额',
    notes: '自动预扣扣减成功'
  },
  {
    id: 'SFB20260718003',
    merchantId: '1014',
    merchantName: '万选文旅',
    orderId: 'OD20240416990',
    payId: 'P20240416990111',
    waybillNo: 'SF168800928313',
    billingMonth: '2026-07',
    shipDate: '2026-07-15 16:05',
    customsPort: '广州白云 (BBC保税)',
    tax: 120.00,
    freight: 55.00,
    totalCost: 175.00,
    status: '已结清',
    deductSource: '服务账户余额',
    notes: '正常月结扣款'
  },
  {
    id: 'SFB20260718004',
    merchantId: '2055',
    merchantName: 'HANNAH加盟店',
    orderId: 'OD20240418214',
    payId: 'P20240418104845',
    waybillNo: 'SF168800928401',
    billingMonth: '2026-07',
    shipDate: '2026-07-16 11:30',
    customsPort: '上海浦东 (BC直邮)',
    tax: 65.00,
    freight: 15.00,
    totalCost: 80.00,
    status: '已结清',
    deductSource: '商家预扣款',
    notes: '关联服务商统一代扣'
  },
  {
    id: 'SFB20260718005',
    merchantId: '2055',
    merchantName: 'HANNAH加盟店',
    orderId: 'OD20240418300',
    payId: 'P20240418105000',
    waybillNo: 'SF168800928402',
    billingMonth: '2026-07',
    shipDate: '2026-07-14 09:45',
    customsPort: '上海浦东 (BC直邮)',
    tax: 110.00,
    freight: 25.00,
    totalCost: 135.00,
    status: '待补缴',
    deductSource: '服务账户余额',
    notes: '账户余额不足，待补扣关费运费'
  },
  {
    id: 'SFB20260718006',
    merchantId: '1018',
    merchantName: '中出服免税',
    orderId: 'OD20240417101',
    payId: 'P20240415951662',
    waybillNo: 'SF168800928505',
    billingMonth: '2026-07',
    shipDate: '2026-07-12 15:20',
    customsPort: '北京首都 (BC直邮)',
    tax: 210.00,
    freight: 60.00,
    totalCost: 270.00,
    status: '已结清',
    deductSource: '服务账户余额',
    notes: '预存抵扣成功'
  },
  {
    id: 'SFB20260718007',
    merchantId: '2033',
    merchantName: '极速奢品',
    orderId: 'OD20240419888',
    payId: 'P20240419888000',
    waybillNo: 'SF168800928601',
    billingMonth: '2026-07',
    shipDate: '2026-07-19 18:00',
    customsPort: '深圳宝安 (BC直邮)',
    tax: 320.00,
    freight: 80.00,
    totalCost: 400.00,
    status: '已结清',
    deductSource: '手动对冲',
    notes: '顺丰月度对账核算结算'
  }
];

const initialServiceAccounts = [
  {
    merchantId: '1014',
    merchantName: '万选文旅',
    role: '服务商' as const,
    billingMonth: '2026-07',
    taxPayable: 264.50,
    freightPayable: 145.00,
    totalPayable: 409.50,
    preDeducted: 409.50,
    unsettledAmount: 0.00,
    accountBalance: 12500.00,
    currency: 'HKD' as const,
    status: '已结清' as const,
    lastUpdated: '2026-07-26 18:30'
  },
  {
    merchantId: '2055',
    merchantName: 'HANNAH加盟店',
    role: '主理人' as const,
    billingMonth: '2026-07',
    taxPayable: 175.00,
    freightPayable: 40.00,
    totalPayable: 215.00,
    preDeducted: 80.00,
    unsettledAmount: 135.00,
    accountBalance: 0.00,
    currency: 'HKD' as const,
    status: '待补缴' as const,
    lastUpdated: '2026-07-26 15:10'
  },
  {
    merchantId: '1018',
    merchantName: '中出服免税',
    role: '服务商' as const,
    billingMonth: '2026-07',
    taxPayable: 210.00,
    freightPayable: 60.00,
    totalPayable: 270.00,
    preDeducted: 270.00,
    unsettledAmount: 0.00,
    accountBalance: 88000.00,
    currency: 'HKD' as const,
    status: '已结清' as const,
    lastUpdated: '2026-07-25 10:00'
  },
  {
    merchantId: '2033',
    merchantName: '极速奢品',
    role: '主理人' as const,
    billingMonth: '2026-07',
    taxPayable: 320.00,
    freightPayable: 80.00,
    totalPayable: 400.00,
    preDeducted: 400.00,
    unsettledAmount: 0.00,
    accountBalance: 3200.00,
    currency: 'HKD' as const,
    status: '已结清' as const,
    lastUpdated: '2026-07-24 14:00'
  }
];

const initialJournals = [
  { id: 'TXN20260726001', merchantId: '1014', merchantName: '万选文旅', type: '充值', amount: 5000.00, currency: 'HKD', time: '2026-07-26 10:30:00', operator: 'admin', remark: '商家预存关运费备用金', balanceAfter: 12500.00 },
  { id: 'TXN20260725002', merchantId: '2055', merchantName: 'HANNAH加盟店', type: '抵扣关运费', amount: -80.00, currency: 'CNY', time: '2026-07-25 15:45:22', operator: 'system', remark: '顺丰月度账单(SF168800928401)自动预扣关运费', balanceAfter: 0.00 },
  { id: 'TXN20260724003', merchantId: '1018', merchantName: '中出服免税', type: '充值', amount: 10000.00, currency: 'HKD', time: '2026-07-24 09:15:00', operator: 'admin', remark: '跨境物流保证金充值', balanceAfter: 88000.00 },
  { id: 'TXN20260720004', merchantId: '1014', merchantName: '万选文旅', type: '抵扣关运费', amount: -409.50, currency: 'CNY', time: '2026-07-20 11:00:00', operator: 'system', remark: '顺丰7月核算对账全额扣抵', balanceAfter: 12500.00 }
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
  const [filingTab, setFilingTab] = useState('category'); // category, product
  const [productFilingTab, setProductFilingTab] = useState<'merchant' | 'public'>('merchant');
  const [categoryFilingTab, setCategoryFilingTab] = useState<'public' | 'merchant'>('public');
  
  // Merchant Master Data State
  const [merchants, setMerchants] = useState(mockMerchants);

  // Modal States
  const [detailDrawer, setDetailDrawer] = useState<{isOpen: boolean, merchant: any, activeTab: string}>({isOpen: false, merchant: null, activeTab: 'basic'});
  const [addModal, setAddModal] = useState<{isOpen: boolean, type: 'provider' | 'sub', parentId?: string}>({isOpen: false, type: 'provider'});
  const [isEditingMerchant, setIsEditingMerchant] = useState(false);

  // --- Service Account & Financial States ---
  const [sfBills, setSfBills] = useState(initialSfWaybillBills);
  const [serviceAccounts, setServiceAccounts] = useState(initialServiceAccounts);
  const [accountJournals, setAccountJournals] = useState(initialJournals);

  // SF Bill Import Modal State
  const [importSfModalOpen, setImportSfModalOpen] = useState(false);
  const [sfImportMonth, setSfImportMonth] = useState('2026-07');
  const [sfImportStep, setSfImportStep] = useState<'upload' | 'preview'>('upload');
  const [importedFileName, setImportedFileName] = useState('顺丰2026年07月报关关税及运费月度对账表.xlsx');

  // Service Account Drilldown & Query States
  const [selectedMerchantDetail, setSelectedMerchantDetail] = useState<any | null>(null);
  const [sfMerchantSearch, setSfMerchantSearch] = useState('');
  const [sfBillingMonthSelect, setSfBillingMonthSelect] = useState('2026-07');
  const [sfOrderQuery, setSfOrderQuery] = useState('');
  const [sfWaybillQuery, setSfWaybillQuery] = useState('');
  const [sfDateRange, setSfDateRange] = useState({ startDate: '', endDate: '' });
  const [sfStatusFilter, setSfStatusFilter] = useState('');
  const [serviceSubTab, setServiceSubTab] = useState<'summary' | 'journals'>('summary');
  const [expandedSummaryMerchantId, setExpandedSummaryMerchantId] = useState<string | null>(null);

  // Order Transaction Payment Channel & Detail States
  const [orderPayChannelFilter, setOrderPayChannelFilter] = useState('');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<any | null>(null);

  // Toast / Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Manual Adjust / Top-up Modal State
  const [manualFundModal, setManualFundModal] = useState<{
    isOpen: boolean;
    merchantId: string;
    merchantName: string;
    type: '充值' | '抵扣关运费' | '手动调整';
    amount: string;
    currency: 'HKD' | 'CNY';
    remark: string;
    operator: string;
  }>({
    isOpen: false,
    merchantId: '1014',
    merchantName: '万选文旅',
    type: '充值',
    amount: '',
    currency: 'HKD',
    remark: '',
    operator: 'admin'
  });

  const openManualFundModal = (merchantId?: string, defaultType: '充值' | '抵扣关运费' | '手动调整' = '充值') => {
    const targetM = serviceAccounts.find(s => s.merchantId === merchantId) || serviceAccounts[0];
    setManualFundModal({
      isOpen: true,
      merchantId: targetM ? targetM.merchantId : '1014',
      merchantName: targetM ? targetM.merchantName : '万选文旅',
      type: defaultType,
      amount: '',
      currency: 'HKD',
      remark: defaultType === '充值' ? '商家服务账户备用金充值' : '7月顺丰关税运费核算抵扣',
      operator: 'admin'
    });
  };

  const handleManualFundSubmit = () => {
    const amt = parseFloat(manualFundModal.amount);
    if (isNaN(amt) || amt <= 0) {
      alert('请输入有效的金额');
      return;
    }

    const { merchantId, merchantName, type, currency, remark, operator } = manualFundModal;
    const isIncrease = type === '充值';
    const delta = isIncrease ? amt : -amt;

    // 1. 更新 serviceAccounts 列表中的余额和待结算
    setServiceAccounts(prev => prev.map(sa => {
      if (sa.merchantId === merchantId) {
        const newBal = Math.max(0, sa.accountBalance + delta);
        const newUnsettled = isIncrease 
          ? Math.max(0, sa.unsettledAmount - amt)
          : sa.unsettledAmount;
        const newStatus = newUnsettled === 0 ? '已结清' : '待补缴';
        return {
          ...sa,
          accountBalance: newBal,
          unsettledAmount: newUnsettled,
          status: newStatus as any,
          lastUpdated: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
      }
      return sa;
    }));

    // 2. 添加 Journal 流水
    const newTxnId = `TXN${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Math.floor(1000 + Math.random() * 9000)}`;
    const targetSa = serviceAccounts.find(s => s.merchantId === merchantId);
    const balanceAfter = (targetSa ? targetSa.accountBalance : 0) + delta;

    setAccountJournals(prev => [
      {
        id: newTxnId,
        merchantId,
        merchantName,
        type,
        amount: isIncrease ? amt : -amt,
        currency,
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        operator,
        remark: remark || (type === '充值' ? '管理员手动充值' : '关运费冲抵扣减'),
        balanceAfter: Math.max(0, balanceAfter)
      },
      ...prev
    ]);

    showToast(`已成功为【${merchantName}】办理 ${type} ${currency} ${amt.toFixed(2)}`);
    setManualFundModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleImportSfBillConfirm = () => {
    showToast(`顺丰 ${sfImportMonth} 月度报关运费表单导入成功！已自动核对 ${sfBills.length} 笔订单关税与运费账单。`);
    setImportSfModalOpen(false);
    setSfImportStep('upload');
  };
  
  // Merchant Basic Info Editing States
  const [editMerchantName, setEditMerchantName] = useState('');
  const [editMerchantPhone, setEditMerchantPhone] = useState('');
  const [editMerchantRole, setEditMerchantRole] = useState<'服务商' | '主理人'>('服务商');
  const [editMerchantStatus, setEditMerchantStatus] = useState('运营中');

  // Add Merchant State & Handlers
  const [addForm, setAddForm] = useState({ name: '', phone: '' });

  const openAddModal = (type: 'provider' | 'sub', parentId?: string) => {
    const prefix = type === 'provider' ? '138' : '139';
    const randomDigits = Math.floor(10000000 + Math.random() * 89999999);
    const defaultPhone = `${prefix}${String(randomDigits).slice(0, 8)}`;
    setAddForm({
      name: '',
      phone: defaultPhone
    });
    setAddModal({ isOpen: true, type, parentId });
  };

  const handleCreateMerchant = () => {
    const name = addForm.name.trim() || (addModal.type === 'provider' ? '新服务商' : '新主理人');
    const phone = addForm.phone.trim() || '13800001234';
    const newId = String(Math.floor(1000 + Math.random() * 9000));

    if (addModal.type === 'provider') {
      const newProvider = {
        id: newId,
        name,
        role: '服务商' as const,
        phone,
        status: '运营中',
        funds: { hkd: 0 },
        payment: { domesticMchId: '', internationalMchId: '', status: '未配置' },
        children: []
      };
      setMerchants(prev => [newProvider, ...prev]);
    } else if (addModal.type === 'sub' && addModal.parentId) {
      const newSub = {
        id: newId,
        name,
        role: '主理人' as const,
        phone,
        status: '运营中',
        funds: { hkd: 0 },
        payment: {
          domesticMchId: '1600000001',
          internationalMchId: '',
          linkedInfo: '复用服务商商户号',
          status: '已配置'
        }
      };
      setMerchants(prev => prev.map(m => {
        if (m.id === addModal.parentId) {
          return {
            ...m,
            children: [...(m.children || []), newSub]
          };
        }
        return m;
      }));
      setExpandedRows(prev => ({ ...prev, [addModal.parentId!]: true }));
    }

    setAddModal({ isOpen: false, type: 'provider' });
  };

  // Merchant Payment Editing States
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    domesticMchId: '',
    internationalMchId: '',
    linkedInfo: ''
  });

  const [productDrawer, setProductDrawer] = useState<{isOpen: boolean, product: any}>({isOpen: false, product: null});
  const [addProductDrawer, setAddProductDrawer] = useState<{isOpen: boolean}>({isOpen: false});
  const [filingModal, setFilingModal] = useState<{isOpen: boolean, product: any}>({isOpen: false, product: null});
  const [fundsTab, setFundsTab] = useState('orders');
  const [topupModal, setTopupModal] = useState<{isOpen: boolean, merchant: any}>({isOpen: false, merchant: null});

  // Helper functions for merchant drawer & editing
  const openMerchantDetail = (merchant: any, activeTab: string = 'basic') => {
    setDetailDrawer({ isOpen: true, merchant, activeTab });
    setIsEditingMerchant(false);
    setIsEditingPayment(false);
    setEditMerchantName(merchant.name || '');
    setEditMerchantPhone(merchant.phone || '');
    setEditMerchantRole(merchant.role || '服务商');
    setEditMerchantStatus(merchant.status || '运营中');
  };

  const handleStartEditingBasic = () => {
    if (!detailDrawer.merchant) return;
    setEditMerchantName(detailDrawer.merchant.name || '');
    setEditMerchantPhone(detailDrawer.merchant.phone || '');
    setEditMerchantRole(detailDrawer.merchant.role || '服务商');
    setEditMerchantStatus(detailDrawer.merchant.status || '运营中');
    setIsEditingMerchant(true);
  };

  const handleSaveBasicInfo = () => {
    if (!detailDrawer.merchant) return;

    // Check if switching from 主理人 to 服务商
    const isRoleSwitchToProvider = detailDrawer.merchant.role === '主理人' && editMerchantRole === '服务商';

    const updatedPayment = isRoleSwitchToProvider
      ? { domesticMchId: '', internationalMchId: '', linkedInfo: '', status: '未配置' }
      : detailDrawer.merchant.payment;

    const updatedMerchant = {
      ...detailDrawer.merchant,
      name: editMerchantName,
      phone: editMerchantPhone,
      role: editMerchantRole,
      status: editMerchantStatus,
      payment: updatedPayment
    };

    setMerchants(prev => {
      return prev.map(m => {
        if (m.id === updatedMerchant.id) return updatedMerchant;
        if (m.children && m.children.length > 0) {
          return {
            ...m,
            children: m.children.map(c => c.id === updatedMerchant.id ? updatedMerchant : c)
          };
        }
        return m;
      });
    });

    setDetailDrawer(prev => ({ ...prev, merchant: updatedMerchant }));
    setIsEditingMerchant(false);
  };

  const handleStartEditingPayment = () => {
    if (!detailDrawer.merchant) return;
    setPaymentForm({
      domesticMchId: detailDrawer.merchant.payment?.domesticMchId || '',
      internationalMchId: detailDrawer.merchant.payment?.internationalMchId || '',
      linkedInfo: detailDrawer.merchant.payment?.linkedInfo || ''
    });
    setIsEditingPayment(true);
  };

  const handleSavePayment = () => {
    if (!detailDrawer.merchant) return;
    const isConfigured = Boolean(paymentForm.domesticMchId || paymentForm.internationalMchId);

    const updatedPayment = {
      domesticMchId: paymentForm.domesticMchId,
      internationalMchId: paymentForm.internationalMchId,
      linkedInfo: paymentForm.linkedInfo,
      status: isConfigured ? '已配置' : '未配置'
    };

    const updatedMerchant = {
      ...detailDrawer.merchant,
      payment: updatedPayment
    };

    setMerchants(prev => {
      return prev.map(m => {
        if (m.id === updatedMerchant.id) return updatedMerchant;
        if (m.children && m.children.length > 0) {
          return {
            ...m,
            children: m.children.map(c => c.id === updatedMerchant.id ? updatedMerchant : c)
          };
        }
        return m;
      });
    });

    setDetailDrawer(prev => ({ ...prev, merchant: updatedMerchant }));
    setIsEditingPayment(false);
  };

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

  // Fallback SKU States
  const [fallbackSkuDrawer, setFallbackSkuDrawer] = useState<{isOpen: boolean, category: any}>({isOpen: false, category: null});
  const [fallbackSkuRules, setFallbackSkuRules] = useState<any[]>([
    { id: '1', categoryId: 'C0011', brand: 'MONCLER', gender: '男', mappings: [{ from: 'EU36', to: '36' }, { from: '5', to: 'UK5' }] }
  ]);

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
        { id: 'hscode', icon: BookOpen, label: '商品备案' },
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
        { id: 'funds-orders', icon: Receipt, label: '订单交易' },
        { id: 'funds-service', icon: Wallet, label: '服务账户' },
      ]
    }
  ];

  const toggleRow = (id: string) => setExpandedRows(prev => ({...prev, [id]: !prev[id]}));

  // --- Views ---

  const renderMerchantView = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 shrink-0">
        <h2 className="text-xl font-semibold text-gray-800">商家管理</h2>
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
            <button onClick={() => openAddModal('provider')} className="bg-brand hover:bg-brand-hover text-white px-4 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors shadow-sm">
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
                <th className="py-3 px-4 font-medium">微信商户号(国内 / 国际)</th>
                <th className="py-3 px-4 font-medium">服务账户余额 (HKD)</th>
                <th className="py-3 px-4 font-medium text-right">管理操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {merchants.map(merchant => {
                const sa = serviceAccounts.find(s => s.merchantId === merchant.id);
                const currentBalance = sa ? sa.accountBalance : merchant.funds.hkd;
                return (
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
                      <td className="py-3 px-4 text-xs font-mono">
                        <div className="text-gray-700">国内: {merchant.payment?.domesticMchId || '未配置'}</div>
                        <div className="text-gray-500 mt-0.5">国际: {merchant.payment?.internationalMchId || '未配置'}</div>
                        {merchant.payment?.linkedInfo && <div className="text-brand mt-0.5 px-1 bg-brand-light/20 inline-block rounded">{merchant.payment.linkedInfo}</div>}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-900 text-sm font-bold">
                        HKD {currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}
                      </td>
                      <td className="py-3 px-4 text-right space-x-3">
                        <button onClick={() => openAddModal('sub', merchant.id)} className="text-brand hover:text-brand-hover font-medium">+ 新增主理人</button>
                        <button onClick={() => openMerchantDetail(merchant, 'basic')} className="text-brand hover:text-brand-hover font-medium">商家详情</button>
                        <button 
                          onClick={() => {
                            const targetSa = sa || {
                              merchantId: merchant.id,
                              merchantName: merchant.name,
                              role: merchant.role as any,
                              billingMonth: '2026-07',
                              taxPayable: 0,
                              freightPayable: 0,
                              totalPayable: 0,
                              preDeducted: 0,
                              unsettledAmount: 0,
                              accountBalance: currentBalance,
                              currency: 'HKD' as const,
                              status: '已结清' as const,
                              lastUpdated: '2026-07-26 18:30'
                            };
                            setSelectedMerchantDetail(targetSa);
                            setActiveNav('funds-service');
                          }} 
                          className="text-brand hover:text-brand-hover font-semibold hover:underline text-sm"
                        >
                          服务账户对账
                        </button>
                        <button 
                          onClick={() => openManualFundModal(merchant.id, '充值')} 
                          className="text-gray-700 hover:text-gray-900 font-medium hover:underline text-sm"
                        >
                          充值/扣款
                        </button>
                      </td>
                    </tr>
                    {expandedRows[merchant.id] && merchant.children?.map(child => {
                      const childSa = serviceAccounts.find(s => s.merchantId === child.id);
                      const childBalance = childSa ? childSa.accountBalance : child.funds.hkd;
                      return (
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
                          <td className="py-3 px-4 text-xs font-mono">
                            <div className="text-gray-700">国内: {child.payment?.domesticMchId || '未配置'}</div>
                            <div className="text-gray-500 mt-0.5">国际: {child.payment?.internationalMchId || '未配置'}</div>
                            {child.payment?.linkedInfo && <div className="text-brand mt-0.5 px-1.5 py-0.5 bg-brand-light/30 inline-block rounded">{child.payment.linkedInfo}</div>}
                          </td>
                          <td className="py-3 px-4 font-mono text-gray-900 text-sm font-bold">
                            HKD {childBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}
                          </td>
                          <td className="py-3 px-4 text-right space-x-3">
                            <button onClick={() => openMerchantDetail(child, 'basic')} className="text-brand hover:text-brand-hover font-medium">商家详情</button>
                            <button 
                              onClick={() => {
                                const targetSa = childSa || {
                                  merchantId: child.id,
                                  merchantName: child.name,
                                  role: child.role as any,
                                  billingMonth: '2026-07',
                                  taxPayable: 0,
                                  freightPayable: 0,
                                  totalPayable: 0,
                                  preDeducted: 0,
                                  unsettledAmount: 0,
                                  accountBalance: childBalance,
                                  currency: 'HKD' as const,
                                  status: '已结清' as const,
                                  lastUpdated: '2026-07-26 18:30'
                                };
                                setSelectedMerchantDetail(targetSa);
                                setActiveNav('funds-service');
                              }} 
                              className="text-brand hover:text-brand-hover font-semibold hover:underline text-sm"
                            >
                              服务账户对账
                            </button>
                            <button 
                              onClick={() => openManualFundModal(child.id, '充值')} 
                              className="text-gray-700 hover:text-gray-900 font-medium hover:underline text-sm"
                            >
                              充值/扣款
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
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
                          <button onClick={() => setFallbackSkuDrawer({isOpen: true, category: child})} className="text-brand hover:underline font-medium">兜底SKU</button>
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
        <h2 className="text-xl font-semibold text-gray-800">商品备案</h2>
      </div>

      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button onClick={() => setFilingTab('category')} className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${filingTab === 'category' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-black'}`}>
          <BookOpen size={16} /> 分类备案
        </button>
        <button onClick={() => setFilingTab('product')} className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${filingTab === 'product' ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-black'}`}>
          <FileText size={16} /> 商品备案
        </button>
      </div>

      {filingTab === 'category' && (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in">
          <div className="flex gap-4 mb-4 shrink-0">
            <button 
              onClick={() => setCategoryFilingTab('public')} 
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${categoryFilingTab === 'public' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
            >
              公共库分类备案
            </button>
            <button 
              onClick={() => setCategoryFilingTab('merchant')} 
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${categoryFilingTab === 'merchant' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
            >
              商家分类映射
            </button>
          </div>
          {categoryFilingTab === 'public' && (
            <div className="flex gap-6 flex-1 min-h-0">
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
          {categoryFilingTab === 'merchant' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center gap-4 shrink-0">
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
          )}
        </div>
      )}

      {filingTab === 'product' && (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in">
          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => setProductFilingTab('merchant')} 
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${productFilingTab === 'merchant' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
            >
              商家商品
            </button>
            <button 
              onClick={() => setProductFilingTab('public')} 
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${productFilingTab === 'public' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
            >
              公共库商品
            </button>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
             <div className="p-4 border-b border-gray-200 flex gap-4 items-center bg-gray-50/50">
                {productFilingTab === 'merchant' && (
                  <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-brand/40" placeholder="商家 ID" />
                )}
                <input type="text" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-brand/40" placeholder="输入 SPU 货号查询" />
                <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-md text-sm transition-colors">查询</button>
             </div>
             <div className="flex-1 overflow-auto">
               <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 sticky top-0">
                    <tr>
                      <th className="py-3 px-6 font-medium">标准货号</th>
                      <th className="py-3 px-4 font-medium">商品名称</th>
                      {productFilingTab === 'merchant' && (
                        <th className="py-3 px-4 font-medium">商家 ID</th>
                      )}
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
                        {productFilingTab === 'merchant' && (
                          <td className="py-4 px-4 font-mono text-gray-500">1567</td>
                        )}
                        <td className="py-4 px-4"><span className="font-mono text-brand">{prod.filingInfo.hsCode}</span></td>
                        <td className="py-4 px-4">
                          <Tag color={prod.filingInfo.status === '已备案' ? 'green' : 'orange'}>{prod.filingInfo.status}</Tag>
                        </td>
                        <td className="py-4 px-6 text-right space-x-3">
                          <button onClick={() => setFilingModal({isOpen: true, product: prod})} className="text-brand hover:underline font-medium">修改备案</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
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

  // --- 1. Order Transactions View ---
  const renderOrderTransactionsView = () => {
    const orderData = [
      { 
        orderId: 'OD20260726001', 
        payId: 'WAL202607261189', 
        store: '1014 - 万选文旅', 
        ownerName: '万选文旅',
        status: '待发货', 
        progress: '清关通过', 
        payChannel: 'Wallyt 国际支付',
        total: 'HKD 1,485.50', 
        fee: 'HKD 14.85', 
        feeRate: 'Wallyt 1.0%',
        tax: 'HKD 54.00', 
        shipping: 'HKD 45.00', 
        hasSplit: true, 
        splitStatus: '已自动分账',
        owner: '万选文旅 (服务账户)', 
        ownerAmt: 'HKD 1,221.65', 
        broker: '平台服务费与分佣', 
        brokerAmt: 'HKD 150.00',
        customsDeclare: 'Wallyt代推海关支付单 (通关成功)',
        orderTime: '2026-07-26 14:22:10'
      },
      { 
        orderId: 'OD20260725042', 
        payId: 'SFT202607258832', 
        store: '2055 - HANNAH加盟店', 
        ownerName: '万选文旅',
        status: '已完成', 
        progress: '买家已签收', 
        payChannel: '微信收付通',
        total: 'CNY 714.61', 
        fee: 'CNY 4.28', 
        feeRate: '微信 0.6%',
        tax: 'CNY 65.00', 
        shipping: 'CNY 15.00', 
        hasSplit: true, 
        splitStatus: '二级商户号解冻',
        owner: '万选文旅 (货主)', 
        ownerAmt: 'CNY 500.00', 
        broker: 'HANNAH加盟店 (分销佣金)', 
        brokerAmt: 'CNY 130.33',
        customsDeclare: '微信收付通报关推单 (179单已推)',
        orderTime: '2026-07-25 10:15:44'
      },
      { 
        orderId: 'OD20260724089', 
        payId: 'YS202607249912', 
        store: '1018 - 中出服免税', 
        ownerName: '中出服免税',
        status: '已发货', 
        progress: '顺丰跨境直邮中', 
        payChannel: '易生支付',
        total: 'CNY 2,380.00', 
        fee: 'CNY 9.52', 
        feeRate: '易生 0.4%',
        tax: 'CNY 210.00', 
        shipping: 'CNY 25.00', 
        hasSplit: true, 
        splitStatus: '托管账户已分账',
        owner: '中出服免税', 
        ownerAmt: 'CNY 2,015.48', 
        broker: '开放平台服务费', 
        brokerAmt: 'CNY 120.00',
        customsDeclare: '易生关企直连推单 (放行)',
        orderTime: '2026-07-24 18:05:12'
      },
      { 
        orderId: 'OD20260722101', 
        payId: 'WAL202607224419', 
        store: '1014 - 万选文旅', 
        ownerName: '万选文旅',
        status: '交易关闭', 
        progress: '买家主动取消', 
        payChannel: 'Wallyt 国际支付',
        total: 'HKD 310.94', 
        fee: 'HKD 0.00', 
        feeRate: '原路全额退款',
        tax: 'HKD 0.00', 
        shipping: 'HKD 0.00', 
        hasSplit: false, 
        splitStatus: '未分账/已退款',
        owner: '--', 
        ownerAmt: '--', 
        broker: '--', 
        brokerAmt: '--',
        customsDeclare: '未推单 (已撤单)',
        orderTime: '2026-07-22 09:30:00'
      },
    ];

    const filteredOrders = orderData.filter(o => {
      const matchChannel = !orderPayChannelFilter || o.payChannel === orderPayChannelFilter;
      const matchSearch = !orderSearchQuery || 
        o.orderId.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.payId.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.store.toLowerCase().includes(orderSearchQuery.toLowerCase());
      return matchChannel && matchSearch;
    });

    return (
      <div className="animate-in fade-in duration-300 h-full flex flex-col p-6 overflow-y-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-5 bg-brand rounded-full"></div>
              开放平台订单交易与支付资金流向
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              实时监控 Wallyt 国际支付、微信收付通、易生支付三大通道的订单实付资金、通道费率、海关关税、顺丰运费与分账明细
            </p>
          </div>
          <button 
            onClick={() => showToast('已成功导出 2026年07月开放平台多通道订单交易流水.xlsx')}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2 font-medium"
          >
            <Download size={16} /> 导出交易与分账流水
          </button>
        </div>

        {/* Payment Channels Top Summary Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-500">Wallyt 国际支付</span>
              <Tag color="blue">跨境外币/港币</Tag>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-mono">HKD 245,800.00</div>
            <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between">
              <span>占比: 52% | 费率: 1.0%</span>
              <span className="text-blue-600 font-medium">代推海关支付单</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-500">微信收付通</span>
              <Tag color="green">微信合规分账</Tag>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-mono">CNY 68,416.12</div>
            <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between">
              <span>占比: 30% | 费率: 0.6%</span>
              <span className="text-emerald-600 font-medium">二级商户延迟结算</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-500">易生支付</span>
              <Tag color="purple">关企直连三单对账</Tag>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-mono">CNY 27,900.00</div>
            <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between">
              <span>占比: 18% | 费率: 0.4%</span>
              <span className="text-purple-600 font-medium">179单实时报关</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-brand/30 bg-brand-light/10 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-brand-dark">平台代扣与结算资金</span>
              <Tag color="orange">关运费代扣</Tag>
            </div>
            <div className="text-2xl font-bold text-brand font-mono">￥ 28,450.00</div>
            <div className="text-[11px] text-gray-600 mt-2">
              海关关税代扣 + 顺丰直邮运费已自动冲抵
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input 
                type="text" 
                value={orderSearchQuery}
                onChange={e => setOrderSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-sm w-56 focus:outline-none focus:border-brand" 
                placeholder="搜索订单号 / 支付流水 / 商家..." 
              />
            </div>

            <select 
              value={orderPayChannelFilter} 
              onChange={e => setOrderPayChannelFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-brand font-medium text-gray-700 bg-white"
            >
              <option value="">全部调用支付渠道 (Wallyt / 微信收付通 / 易生支付)</option>
              <option value="Wallyt 国际支付">Wallyt 国际支付</option>
              <option value="微信收付通">微信收付通</option>
              <option value="易生支付">易生支付</option>
            </select>

            <button className="bg-brand hover:bg-brand-hover text-white px-5 py-1.5 rounded-lg text-sm transition-colors font-medium">
              筛选查询
            </button>
            {orderPayChannelFilter && (
              <button 
                onClick={() => setOrderPayChannelFilter('')}
                className="text-gray-500 hover:text-gray-700 text-xs underline"
              >
                重置渠道筛选
              </button>
            )}
          </div>
        </div>

        {/* Orders & Money Flow Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto flex-1">
          <table className="w-full text-left text-sm min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
              <tr>
                <th className="py-3.5 px-4 font-medium">订单号 / 外部支付流水号</th>
                <th className="py-3.5 px-4 font-medium">调用支付渠道</th>
                <th className="py-3.5 px-4 font-medium">销售商家 / 货主</th>
                <th className="py-3.5 px-4 font-medium">实付总额</th>
                <th className="py-3.5 px-4 font-medium">资金扣除项 (手续费/关税/运费)</th>
                <th className="py-3.5 px-4 font-medium">分账结算流向</th>
                <th className="py-3.5 px-4 font-medium">海关支付单推单</th>
                <th className="py-3.5 px-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-gray-900 font-bold">{row.orderId}</div>
                    <div className="text-gray-400 text-xs font-mono">流水: {row.payId}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{row.orderTime}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Tag color={
                      row.payChannel === 'Wallyt 国际支付' ? 'blue' : 
                      row.payChannel === '微信收付通' ? 'green' : 'purple'
                    }>
                      {row.payChannel}
                    </Tag>
                    <div className="text-[11px] text-gray-500 mt-1">{row.feeRate}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-gray-900 font-semibold">{row.store}</div>
                    <div className="text-xs text-gray-500">货主: {row.ownerName}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 font-mono text-base">{row.total}</div>
                    <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium inline-block mt-0.5 ${row.status === '交易关闭' ? 'bg-gray-100 text-gray-500' : 'bg-emerald-50 text-emerald-700'}`}>
                      {row.status} ({row.progress})
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs font-mono">
                    <div className="space-y-0.5">
                      <div className="flex justify-between gap-2 text-gray-600">
                        <span>通道手续费:</span><span className="text-red-500">-{row.fee}</span>
                      </div>
                      <div className="flex justify-between gap-2 text-gray-600">
                        <span>海关关税:</span><span className="text-orange-600">-{row.tax}</span>
                      </div>
                      <div className="flex justify-between gap-2 text-gray-600">
                        <span>顺丰运费:</span><span className="text-blue-600">-{row.shipping}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <div className="font-medium text-gray-800">{row.owner}</div>
                    <div className="font-mono text-emerald-600 font-bold">{row.ownerAmt}</div>
                    {row.broker !== '--' && (
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {row.broker}: <span className="font-mono">{row.brokerAmt}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <div className="text-gray-700 font-medium">{row.customsDeclare}</div>
                    <div className="text-emerald-600 text-[11px] font-semibold mt-0.5">{row.splitStatus}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => setSelectedOrderDetail(row)} 
                      className="text-brand hover:text-brand-hover hover:underline text-sm font-semibold flex items-center justify-end gap-1 ml-auto"
                    >
                      资金流向详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Transaction Detail Modal */}
        {selectedOrderDetail && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-[680px] max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <Coins className="text-brand" size={20} />
                  <h3 className="font-bold text-lg text-gray-900">开放平台订单资金与支付流向全景</h3>
                </div>
                <button 
                  onClick={() => setSelectedOrderDetail(null)} 
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5 text-sm">
                {/* Basic Order Bar */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500 block">订单编号</span>
                    <span className="font-mono font-bold text-gray-900">{selectedOrderDetail.orderId}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">外部支付交易流水号</span>
                    <span className="font-mono font-bold text-gray-900">{selectedOrderDetail.payId}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">销售商家 / 归属货主</span>
                    <span className="font-medium text-gray-900">{selectedOrderDetail.store}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">下单时间</span>
                    <span className="font-mono text-gray-700">{selectedOrderDetail.orderTime}</span>
                  </div>
                </div>

                {/* Call Payment Gateway Badge */}
                <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-900">调用的底层支付通道</span>
                    <Tag color={
                      selectedOrderDetail.payChannel === 'Wallyt 国际支付' ? 'blue' : 
                      selectedOrderDetail.payChannel === '微信收付通' ? 'green' : 'purple'
                    }>
                      {selectedOrderDetail.payChannel}
                    </Tag>
                  </div>
                  <p className="text-xs text-blue-800">
                    该订单由开放平台统一路由调用 <span className="font-bold">{selectedOrderDetail.payChannel}</span> 接口进行跨境支付收单，通道费率为 {selectedOrderDetail.feeRate}。
                  </p>
                </div>

                {/* Flow Diagram */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 border-l-4 border-brand pl-2">资金拆分与清算流向 (Money Flow Split)</h4>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center bg-gray-100 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-sans font-medium">1. 客户买家实付金额:</span>
                      <span className="text-base font-bold text-gray-900">{selectedOrderDetail.total}</span>
                    </div>

                    <div className="pl-4 space-y-1.5 border-l-2 border-gray-200">
                      <div className="flex justify-between items-center bg-red-50 p-2 rounded text-red-800 border border-red-100">
                        <span className="font-sans">[-] 支付通道手续费 ({selectedOrderDetail.feeRate}):</span>
                        <span className="font-bold">-{selectedOrderDetail.fee}</span>
                      </div>
                      <div className="flex justify-between items-center bg-orange-50 p-2 rounded text-orange-800 border border-orange-100">
                        <span className="font-sans">[-] 平台代扣海关关税 (税单对账):</span>
                        <span className="font-bold">-{selectedOrderDetail.tax}</span>
                      </div>
                      <div className="flex justify-between items-center bg-blue-50 p-2 rounded text-blue-800 border border-blue-100">
                        <span className="font-sans">[-] 平台代扣顺丰直邮运费:</span>
                        <span className="font-bold">-{selectedOrderDetail.shipping}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      <span className="text-emerald-900 font-sans font-bold">2. 货主商家实际结算到账:</span>
                      <span className="text-base font-bold text-emerald-700">{selectedOrderDetail.ownerAmt} ({selectedOrderDetail.owner})</span>
                    </div>

                    {selectedOrderDetail.broker !== '--' && (
                      <div className="flex justify-between items-center bg-purple-50 p-2.5 rounded-lg border border-purple-200">
                        <span className="text-purple-900 font-sans font-medium">3. 平台分佣 / 分销方佣金:</span>
                        <span className="text-base font-bold text-purple-700">{selectedOrderDetail.brokerAmt} ({selectedOrderDetail.broker})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customs Payment Order Push Status */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-2">
                  <h4 className="font-bold text-xs text-gray-800">海关三单比对与推单回执</h4>
                  <div className="text-xs text-gray-600 flex justify-between">
                    <span>支付单推送状态: <strong className="text-gray-900">{selectedOrderDetail.customsDeclare}</strong></span>
                    <span className="text-emerald-600 font-bold">{selectedOrderDetail.splitStatus}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button 
                  onClick={() => setSelectedOrderDetail(null)} 
                  className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-lg font-medium transition-colors shadow-sm"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- 2. Service Account & SF Bill Settlement View ---
  const renderServiceAccountView = () => {
    // If a merchant detail drilldown is active
    if (selectedMerchantDetail) {
      // Filter waybill bills for this selected merchant
      const filteredBills = sfBills.filter(b => {
        const matchesMerchant = b.merchantId === selectedMerchantDetail.merchantId;
        const matchesOrder = !sfOrderQuery || b.orderId.toLowerCase().includes(sfOrderQuery.toLowerCase().trim());
        const matchesWaybill = !sfWaybillQuery || b.waybillNo.toLowerCase().includes(sfWaybillQuery.toLowerCase().trim());
        const matchesStatus = !sfStatusFilter || b.status === sfStatusFilter;
        return matchesMerchant && matchesOrder && matchesWaybill && matchesStatus;
      });

      const totalTaxSum = filteredBills.reduce((acc, curr) => acc + curr.tax, 0);
      const totalFreightSum = filteredBills.reduce((acc, curr) => acc + curr.freight, 0);
      const totalCostSum = filteredBills.reduce((acc, curr) => acc + curr.totalCost, 0);

      return (
        <div className="animate-in fade-in duration-200 h-full flex flex-col p-6 overflow-y-auto bg-gray-50/50">
          {/* Header Navigation */}
          <div className="mb-6 flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedMerchantDetail(null)} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
              >
                <ArrowLeft size={18} /> 返回服务账户列表
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{selectedMerchantDetail.merchantName}</h2>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">ID: {selectedMerchantDetail.merchantId}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">商家服务账户对账详情 - 账单月度: {selectedMerchantDetail.billingMonth}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => openManualFundModal(selectedMerchantDetail.merchantId, '充值')} 
                className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Plus size={15} /> 账户充值 / 调账扣款
              </button>
            </div>
          </div>

          {/* Monthly Settlement Summary Overview Cards */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-orange-100 bg-orange-50/30 shadow-sm">
              <div className="text-xs text-gray-500 font-medium">当月海关关税代扣</div>
              <div className="text-xl font-bold text-orange-600 font-mono mt-1">￥ {totalTaxSum.toFixed(2)}</div>
              <div className="text-[11px] text-gray-400 mt-1">海关代扣税单累计</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-blue-100 bg-blue-50/30 shadow-sm">
              <div className="text-xs text-gray-500 font-medium">当月顺丰月结运费</div>
              <div className="text-xl font-bold text-blue-600 font-mono mt-1">￥ {totalFreightSum.toFixed(2)}</div>
              <div className="text-[11px] text-gray-400 mt-1">关联运单 {filteredBills.length} 笔</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-500 font-medium">当月关运费应交合计</div>
              <div className="text-xl font-bold text-gray-900 font-mono mt-1">￥ {totalCostSum.toFixed(2)}</div>
              <div className="text-[11px] text-gray-400 mt-1">关税 + 顺丰运费</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 shadow-sm">
              <div className="text-xs text-gray-500 font-medium">服务账户已预扣抵扣</div>
              <div className="text-xl font-bold text-emerald-600 font-mono mt-1">￥ {(selectedMerchantDetail.preDeducted || totalCostSum).toFixed(2)}</div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1">实时在服务账户流水中抵扣</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-brand/30 bg-brand-light/10 shadow-sm">
              <div className="text-xs text-brand-dark font-medium">服务账户当前余额</div>
              <div className="text-xl font-bold text-brand font-mono mt-1">HKD {selectedMerchantDetail.accountBalance.toFixed(2)}</div>
              <div className="text-[11px] text-gray-500 mt-1 font-mono">核算状态: {selectedMerchantDetail.status || '已结清'}</div>
            </div>
          </div>

          {/* Precision Query Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm">
                <Search size={15} className="text-gray-400" />
                <input 
                  type="text" 
                  value={sfOrderQuery} 
                  onChange={e => setSfOrderQuery(e.target.value)} 
                  placeholder="按订单号查询 (Order ID)" 
                  className="w-48 outline-none text-sm font-mono"
                />
                {sfOrderQuery && <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setSfOrderQuery('')} />}
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm">
                <Truck size={15} className="text-brand" />
                <input 
                  type="text" 
                  value={sfWaybillQuery} 
                  onChange={e => setSfWaybillQuery(e.target.value)} 
                  placeholder="按顺丰运单号查询 (SF...)" 
                  className="w-48 outline-none text-sm font-mono"
                />
                {sfWaybillQuery && <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setSfWaybillQuery('')} />}
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm">
                <Calendar size={15} className="text-gray-400" />
                <input 
                  type="date" 
                  value={sfDateRange.startDate} 
                  onChange={e => setSfDateRange({...sfDateRange, startDate: e.target.value})} 
                  className="outline-none text-xs text-gray-700"
                />
                <span className="text-gray-300">至</span>
                <input 
                  type="date" 
                  value={sfDateRange.endDate} 
                  onChange={e => setSfDateRange({...sfDateRange, endDate: e.target.value})} 
                  className="outline-none text-xs text-gray-700"
                />
              </div>

              <select 
                value={sfStatusFilter} 
                onChange={e => setSfStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white text-gray-700 outline-none"
              >
                <option value="">全部结算状态</option>
                <option value="已结清">已结清</option>
                <option value="待补缴">待补缴</option>
                <option value="核算异常">核算异常</option>
              </select>

              {(sfOrderQuery || sfWaybillQuery || sfDateRange.startDate || sfStatusFilter) && (
                <button 
                  onClick={() => { setSfOrderQuery(''); setSfWaybillQuery(''); setSfDateRange({startDate:'', endDate:''}); setSfStatusFilter(''); }} 
                  className="text-xs text-gray-500 hover:text-gray-800 underline ml-1"
                >
                  重置筛选
                </button>
              )}
            </div>

            <button 
              onClick={() => showToast(`已成功导出【${selectedMerchantDetail.merchantName}】当月关运费明细表`)} 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Download size={14} /> 导出商家单据明细
            </button>
          </div>

          {/* Drilldown Detail Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3.5 px-4 font-medium">顺丰运单号 / 物流公司</th>
                  <th className="py-3.5 px-4 font-medium">平台订单号 / 支付单号</th>
                  <th className="py-3.5 px-4 font-medium">揽收/报关时间</th>
                  <th className="py-3.5 px-4 font-medium">报关关区 / 模式</th>
                  <th className="py-3.5 px-4 font-medium">申报关税 (CNY)</th>
                  <th className="py-3.5 px-4 font-medium">实际运费 (CNY)</th>
                  <th className="py-3.5 px-4 font-medium">费用合计 (CNY)</th>
                  <th className="py-3.5 px-4 font-medium">结算状态 / 资金来源</th>
                  <th className="py-3.5 px-4 font-medium text-right">核对备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBills.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-400">
                      未找到符合条件的顺丰关运费对账明细记录
                    </td>
                  </tr>
                ) : (
                  filteredBills.map((bill) => (
                    <tr key={bill.waybillNo} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-gray-900">
                        <div>{bill.waybillNo}</div>
                        <span className="text-[11px] text-gray-400 font-sans">{bill.carrier}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        <div className="text-brand font-medium">{bill.orderId}</div>
                        <div className="text-gray-400 font-mono text-[11px]">P: {bill.payId}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-gray-600">
                        {bill.pickupTime}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-gray-700">
                        <div>{bill.customsDistrict}</div>
                        <span className="text-[10px] text-gray-400">{bill.importMode}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-orange-600 font-medium">
                        ￥ {bill.tax.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-blue-600 font-medium">
                        ￥ {bill.freight.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                        ￥ {bill.totalCost.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <Tag color={bill.status === '已结清' ? 'green' : bill.status === '待补缴' ? 'red' : 'orange'}>
                          {bill.status}
                        </Tag>
                        <div className="text-[11px] text-gray-400 mt-1">{bill.deductSource}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-mono">
                        {bill.remark}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // --- Main Service Account Summary View ---
    const totalTaxAll = serviceAccounts.reduce((acc, curr) => acc + curr.taxPayable, 0);
    const totalFreightAll = serviceAccounts.reduce((acc, curr) => acc + curr.freightPayable, 0);
    const totalPayableAll = serviceAccounts.reduce((acc, curr) => acc + curr.totalPayable, 0);
    const totalUnsettledAll = serviceAccounts.reduce((acc, curr) => acc + curr.unsettledAmount, 0);

    // Filter service accounts
    const filteredAccounts = serviceAccounts.filter(sa => {
      const matchMonth = !sfBillingMonthSelect || sa.billingMonth === sfBillingMonthSelect;
      const matchName = !sfMerchantSearch || sa.merchantName.toLowerCase().includes(sfMerchantSearch.toLowerCase().trim()) || sa.merchantId.includes(sfMerchantSearch.trim());
      return matchMonth && matchName;
    });

    return (
      <div className="animate-in fade-in duration-300 h-full flex flex-col p-6 overflow-y-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-5 bg-brand rounded-full"></div>
              服务账户与顺丰月度对账
            </h2>
            <p className="text-xs text-gray-400 mt-1">作为平台统一核算商家顺丰跨境直邮关税与运费账单，支持表单导入、预扣抵扣与手动充值变更</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setImportSfModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <FileSpreadsheet size={16} /> 导入顺丰月度表单
            </button>

            <button 
              onClick={() => openManualFundModal(undefined, '充值')}
              className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Plus size={16} /> 新增充值/扣减
            </button>

            <button 
              onClick={() => showToast('顺丰关运费平台对账汇总大表已导出')}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <Download size={16} /> 导出对账表
            </button>
          </div>
        </div>

        {/* Top SF Summary Metric Cards */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs font-medium text-gray-500 mb-1 flex justify-between items-center">
              <span>顺丰当月关税总应付</span>
              <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded font-bold">SF 月结</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-mono">￥ {totalTaxAll.toFixed(2)}</div>
            <div className="text-[11px] text-gray-400 mt-2">海关跨境 BC / BBC 保税清单</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs font-medium text-gray-500 mb-1 flex justify-between items-center">
              <span>顺丰当月运费总应付</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-bold">物流运单</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-mono">￥ {totalFreightAll.toFixed(2)}</div>
            <div className="text-[11px] text-gray-400 mt-2">含国际揽收与国内干线派送</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs font-medium text-gray-500 mb-1">商家关运费合计应缴</div>
            <div className="text-2xl font-bold text-brand font-mono">￥ {totalPayableAll.toFixed(2)}</div>
            <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle2 size={12} /> 平台已预扣大部分账款
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs font-medium text-gray-500 mb-1">待结算/未补缴总额</div>
            <div className="text-2xl font-bold text-orange-600 font-mono">￥ {totalUnsettledAll.toFixed(2)}</div>
            <div className="text-[11px] text-orange-500 mt-2">需提示商家手动补缴充值</div>
          </div>
        </div>

        {/* Toolbar & Sub-Tab Navigation */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setServiceSubTab('summary')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${serviceSubTab === 'summary' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              商家关运费对账汇总表
            </button>
            <button 
              onClick={() => setServiceSubTab('journals')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${serviceSubTab === 'journals' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              账户资金变更流水 ({accountJournals.length})
            </button>
          </div>

          {serviceSubTab === 'summary' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm">
                <Calendar size={15} className="text-gray-400" />
                <span className="text-xs text-gray-500">账单月份:</span>
                <select 
                  value={sfBillingMonthSelect} 
                  onChange={e => setSfBillingMonthSelect(e.target.value)}
                  className="outline-none text-sm font-medium text-gray-800 bg-transparent"
                >
                  <option value="2026-07">2026年07月 (最新账单)</option>
                  <option value="2026-06">2026年06月</option>
                  <option value="2026-05">2026年05月</option>
                </select>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
                <input 
                  type="text" 
                  value={sfMerchantSearch}
                  onChange={e => setSfMerchantSearch(e.target.value)}
                  placeholder="搜索商家名称 / ID..."
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-sm w-52 focus:outline-none focus:border-brand"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        {serviceSubTab === 'summary' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3.5 px-4 font-medium">商家 ID / 商家名称</th>
                  <th className="py-3.5 px-4 font-medium">账单月份</th>
                  <th className="py-3.5 px-4 font-medium">当月应付关税</th>
                  <th className="py-3.5 px-4 font-medium">当月应付运费</th>
                  <th className="py-3.5 px-4 font-medium">应交费用合计</th>
                  <th className="py-3.5 px-4 font-medium">已预扣/已抵扣</th>
                  <th className="py-3.5 px-4 font-medium">待结算/应补缴</th>
                  <th className="py-3.5 px-4 font-medium">服务账户余额</th>
                  <th className="py-3.5 px-4 font-medium">核算状态</th>
                  <th className="py-3.5 px-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAccounts.map((item) => (
                  <tr key={item.merchantId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{item.merchantName}</div>
                      <div className="text-gray-400 text-xs font-mono">ID: {item.merchantId}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-600 text-xs">{item.billingMonth}</td>
                    <td className="py-4 px-4 font-mono text-orange-600">￥ {item.taxPayable.toFixed(2)}</td>
                    <td className="py-4 px-4 font-mono text-blue-600">￥ {item.freightPayable.toFixed(2)}</td>
                    <td className="py-4 px-4 font-mono font-bold text-gray-900">￥ {item.totalPayable.toFixed(2)}</td>
                    <td className="py-4 px-4 font-mono text-emerald-600">￥ {item.preDeducted.toFixed(2)}</td>
                    <td className="py-4 px-4 font-mono">
                      {item.unsettledAmount > 0 ? (
                        <span className="text-red-600 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded text-xs">
                          ￥ {item.unsettledAmount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">￥ 0.00</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-gray-800">
                      HKD {item.accountBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </td>
                    <td className="py-4 px-4">
                      <Tag color={item.status === '已结清' ? 'green' : 'orange'}>
                        {item.status}
                      </Tag>
                    </td>
                    <td className="py-4 px-4 text-right space-x-3">
                      <button 
                        onClick={() => setSelectedMerchantDetail(item)}
                        className="text-brand hover:text-brand-hover font-semibold hover:underline text-sm"
                      >
                        查看对账详情
                      </button>
                      <button 
                        onClick={() => openManualFundModal(item.merchantId, '充值')}
                        className="text-gray-700 hover:text-gray-900 font-medium hover:underline text-sm"
                      >
                        充值/扣款
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Journals Table */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-3.5 px-4 font-medium">流水号</th>
                  <th className="py-3.5 px-4 font-medium">商家名称 / ID</th>
                  <th className="py-3.5 px-4 font-medium">变更类型</th>
                  <th className="py-3.5 px-4 font-medium">变更金额</th>
                  <th className="py-3.5 px-4 font-medium">币种</th>
                  <th className="py-3.5 px-4 font-medium">变更后余额</th>
                  <th className="py-3.5 px-4 font-medium">操作时间</th>
                  <th className="py-3.5 px-4 font-medium">经办人</th>
                  <th className="py-3.5 px-4 font-medium">业务备注说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accountJournals.map((j) => (
                  <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-500">{j.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{j.merchantName}</div>
                      <div className="text-gray-400 text-xs font-mono">{j.merchantId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Tag color={j.type === '充值' ? 'green' : 'orange'}>{j.type}</Tag>
                    </td>
                    <td className={`py-3.5 px-4 font-mono font-bold ${j.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {j.amount >= 0 ? `+${j.amount.toFixed(2)}` : j.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">{j.currency}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-800">
                      HKD {j.balanceAfter.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-gray-500">{j.time}</td>
                    <td className="py-3.5 px-4 text-gray-700 text-xs">{j.operator}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-500 max-w-xs truncate" title={j.remark}>{j.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

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
        {(activeNav === 'funds' || activeNav === 'funds-orders') && renderOrderTransactionsView()}
        {activeNav === 'funds-service' && renderServiceAccountView()}
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
                      <button onClick={handleStartEditingBasic} className="text-brand text-sm flex items-center gap-1 hover:underline"><Edit2 size={14}/> 编辑信息</button>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => setIsEditingMerchant(false)} className="text-gray-500 text-sm hover:underline">取消</button>
                        <button onClick={handleSaveBasicInfo} className="bg-brand text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-brand-hover shadow-sm"><Save size={14}/> 保存</button>
                      </div>
                    )}
                  </div>
                  
                  {isEditingMerchant ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-sm bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <div>
                          <label className="text-gray-500 block mb-1.5">商家ID (不可修改)</label>
                          <input type="text" disabled value={detailDrawer.merchant.id} className="w-full border border-gray-200 bg-gray-100 rounded px-3 py-2 text-gray-500 font-mono" />
                        </div>
                        <div>
                          <label className="text-gray-500 block mb-1.5">登录手机号</label>
                          <input type="text" value={editMerchantPhone} onChange={e => setEditMerchantPhone(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                        </div>
                        <div>
                          <label className="text-gray-500 block mb-1.5">商家名称</label>
                          <input type="text" value={editMerchantName} onChange={e => setEditMerchantName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                        </div>
                        <div>
                          <label className="text-gray-500 block mb-1.5">角色类型</label>
                          <select value={editMerchantRole} onChange={e => setEditMerchantRole(e.target.value as any)} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none font-medium">
                            <option value="服务商">服务商</option>
                            <option value="主理人">主理人</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-500 block mb-1.5">当前状态</label>
                          <select value={editMerchantStatus} onChange={e => setEditMerchantStatus(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none">
                            <option value="运营中">运营中</option>
                            <option value="已关闭">已关闭</option>
                          </select>
                        </div>
                      </div>

                      {detailDrawer.merchant.role === '主理人' && editMerchantRole === '服务商' && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3.5 rounded-lg flex items-start gap-2">
                          <span className="font-bold shrink-0">⚠️ 提示:</span>
                          <div>从【主理人】切换为【服务商】，保存后将自动清空原绑定的微信商户号及关联逻辑，需重新配置独立的商户号。</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
                      <div><span className="text-gray-500 block mb-1">商家ID</span><span className="font-mono text-gray-800">{detailDrawer.merchant.id}</span></div>
                      <div><span className="text-gray-500 block mb-1">登录手机号</span><span className="font-mono text-gray-800">{detailDrawer.merchant.phone}</span></div>
                      <div><span className="text-gray-500 block mb-1">商家名称</span><span className="text-gray-800">{detailDrawer.merchant.name}</span></div>
                      <div><span className="text-gray-500 block mb-1">角色类型</span><span className="text-gray-800 font-medium">{detailDrawer.merchant.role}</span></div>
                      <div><span className="text-gray-500 block mb-1">入驻时间</span><span className="text-gray-800">2026-01-15</span></div>
                      <div><span className="text-gray-500 block mb-1">当前状态</span><span className={detailDrawer.merchant.status === '运营中' ? 'text-gray-700' : 'text-gray-500'}>{detailDrawer.merchant.status}</span></div>
                    </div>
                  )}
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
                  {!isEditingPayment ? (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">微信支付商户号配置</h3>
                        <button onClick={handleStartEditingPayment} className="text-brand text-sm hover:underline font-medium flex items-center gap-1">
                          <Edit2 size={14}/> 修改配置
                        </button>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 grid grid-cols-2 gap-6 text-sm">
                        <div>
                          <span className="text-gray-500 block mb-1.5">国内商户号 (MchID)</span>
                          <span className="font-mono text-gray-800 font-medium">{detailDrawer.merchant.payment?.domesticMchId || '未配置'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block mb-1.5">国际商户号 (Overseas MchID)</span>
                          <span className="font-mono text-gray-800 font-medium">{detailDrawer.merchant.payment?.internationalMchId || '未配置'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block mb-1.5">配置状态</span>
                          <Tag color={detailDrawer.merchant.payment?.domesticMchId || detailDrawer.merchant.payment?.internationalMchId ? 'green' : 'slate'}>
                            {detailDrawer.merchant.payment?.status || '未配置'}
                          </Tag>
                        </div>
                        {detailDrawer.merchant.payment?.linkedInfo && (
                          <div className="pt-1">
                            <span className="text-gray-500 block mb-1.5">关联模式说明</span>
                            <span className="text-brand bg-brand-light/30 border border-brand/20 px-2.5 py-1 rounded text-xs font-medium inline-block">
                              {detailDrawer.merchant.payment.linkedInfo}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800 border-l-4 border-brand pl-3">编辑微信支付商户号</h3>
                        <div className="flex gap-2">
                          <button onClick={() => setIsEditingPayment(false)} className="text-gray-500 text-sm hover:underline">取消</button>
                          <button onClick={handleSavePayment} className="bg-brand text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-brand-hover shadow-sm">
                            <Save size={14}/> 保存配置
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-5 text-sm">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="text-gray-700 font-medium block mb-1.5">国内商户号 (MchID)</label>
                            <input 
                              type="text" 
                              value={paymentForm.domesticMchId} 
                              onChange={e => setPaymentForm({...paymentForm, domesticMchId: e.target.value, linkedInfo: ''})} 
                              placeholder="请输入国内微信支付商户号 (如 1600000001)" 
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none font-mono" 
                            />
                          </div>
                          <div>
                            <label className="text-gray-700 font-medium block mb-1.5">国际商户号 (Overseas MchID)</label>
                            <input 
                              type="text" 
                              value={paymentForm.internationalMchId} 
                              onChange={e => setPaymentForm({...paymentForm, internationalMchId: e.target.value})} 
                              placeholder="请输入国际微信支付商户号 (如 HK99001122)" 
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none font-mono" 
                            />
                          </div>
                        </div>

                        {detailDrawer.merchant.role === '主理人' && (
                          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-xs text-gray-500">主理人快捷模式:</span>
                            <button 
                              type="button" 
                              onClick={() => setPaymentForm({
                                ...paymentForm, 
                                domesticMchId: '1600000001', 
                                linkedInfo: '复用服务商商户号'
                              })} 
                              className="text-xs text-brand hover:underline font-medium"
                            >
                              复用上级服务商商户号
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
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
              <h3 className="font-semibold text-lg text-gray-800">{addModal.type === 'provider' ? '新增服务商' : '新增下级主理人'}</h3>
              <button onClick={() => setAddModal({isOpen: false, type: 'provider'})} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              {addModal.type === 'sub' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">所属服务商</label>
                  <input type="text" disabled value={merchants.find(m => m.id === addModal.parentId)?.name || ''} className="w-full border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-500 font-medium" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">商家名称 <span className="text-brand">*</span></label>
                <input 
                  type="text" 
                  value={addForm.name} 
                  onChange={e => setAddForm({...addForm, name: e.target.value})} 
                  placeholder={addModal.type === 'provider' ? "请输入服务商营业执照/企业名称" : "请输入主理人商家名称"} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">登录手机号 <span className="text-brand">*</span></label>
                  <button 
                    type="button" 
                    onClick={() => setAddForm({...addForm, phone: `${addModal.type === 'provider' ? '138' : '139'}${Math.floor(10000000 + Math.random() * 89999999).toString().slice(0, 8)}`})} 
                    className="text-xs text-brand hover:underline font-normal"
                  >
                    自动生成新手机号
                  </button>
                </div>
                <input 
                  type="text" 
                  value={addForm.phone} 
                  onChange={e => setAddForm({...addForm, phone: e.target.value})} 
                  placeholder="11位手机号，将作为该商家的唯一登录账号" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all font-mono" 
                />
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <span className="text-brand">*</span> 已自动为您填入常用手机号，创建成功后初始默认密码为 123456
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setAddModal({isOpen: false, type: 'provider'})} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors font-medium">取消</button>
              <button onClick={handleCreateMerchant} className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-md transition-colors font-medium shadow-sm">确认创建</button>
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

      {/* Fallback SKU Drawer */}
      {fallbackSkuDrawer.isOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-[600px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">兜底 SKU 规格设置</h3>
                <div className="text-sm text-gray-500 mt-1">分类: <span className="font-medium text-gray-700">{fallbackSkuDrawer.category?.name}</span></div>
              </div>
              <button onClick={() => setFallbackSkuDrawer({isOpen: false, category: null})} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-gray-50/30">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">匹配规则列表</h4>
                <button 
                  onClick={() => setFallbackSkuRules([...fallbackSkuRules, { id: Date.now().toString(), categoryId: fallbackSkuDrawer.category?.id, brand: '', gender: '无', mappings: [] }])}
                  className="text-sm bg-brand text-white px-3 py-1.5 rounded hover:bg-brand-hover transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> 新增规则
                </button>
              </div>

              {fallbackSkuRules.filter(r => r.categoryId === fallbackSkuDrawer.category?.id).length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-white rounded-lg border border-dashed border-gray-200">暂无兜底匹配规则</div>
              ) : (
                fallbackSkuRules.filter(r => r.categoryId === fallbackSkuDrawer.category?.id).map((rule, index) => (
                  <div key={rule.id} className="bg-white border text-sm border-gray-200 rounded-lg shadow-sm overflow-hidden relative">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">品牌:</span>
                        <input type="text" value={rule.brand} onChange={(e) => {
                          const newRules = [...fallbackSkuRules];
                          const idx = newRules.findIndex(r => r.id === rule.id);
                          newRules[idx].brand = e.target.value;
                          setFallbackSkuRules(newRules);
                        }} className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand w-32" placeholder="如 MONCLER" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">性别:</span>
                        <select value={rule.gender} onChange={(e) => {
                          const newRules = [...fallbackSkuRules];
                          const idx = newRules.findIndex(r => r.id === rule.id);
                          newRules[idx].gender = e.target.value;
                          setFallbackSkuRules(newRules);
                        }} className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-brand text-gray-700">
                          <option value="男">男</option>
                          <option value="女">女</option>
                          <option value="儿童">儿童</option>
                          <option value="无">无</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => {
                          setFallbackSkuRules(fallbackSkuRules.filter(r => r.id !== rule.id));
                        }}
                        className="ml-auto text-red-500 hover:text-red-600 px-2 text-xs"
                      >
                        删除规则
                      </button>
                    </div>
                    
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>字符映射配置 (例如: 将商品SKU的EU36映射为标准尺寸36)</span>
                        <button 
                          onClick={() => {
                            const newRules = [...fallbackSkuRules];
                            const idx = newRules.findIndex(r => r.id === rule.id);
                            newRules[idx].mappings.push({ from: '', to: '' });
                            setFallbackSkuRules(newRules);
                          }}
                          className="text-brand hover:underline font-medium"
                        >+ 添加映射</button>
                      </div>
                      
                      {rule.mappings.length === 0 ? (
                        <div className="text-gray-400 text-xs italic py-2">暂无映射</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {rule.mappings.map((mapping: any, mIdx: number) => (
                            <div key={mIdx} className="flex gap-2 items-center bg-gray-50 p-2 rounded border border-gray-100">
                              <input type="text" value={mapping.from} onChange={(e) => {
                                const newRules = [...fallbackSkuRules];
                                const rIdx = newRules.findIndex(r => r.id === rule.id);
                                newRules[rIdx].mappings[mIdx].from = e.target.value;
                                setFallbackSkuRules(newRules);
                              }} className="w-16 border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-brand text-center" placeholder="EU36" />
                              <div className="text-gray-400">→</div>
                              <input type="text" value={mapping.to} onChange={(e) => {
                                const newRules = [...fallbackSkuRules];
                                const rIdx = newRules.findIndex(r => r.id === rule.id);
                                newRules[rIdx].mappings[mIdx].to = e.target.value;
                                setFallbackSkuRules(newRules);
                              }} className="w-16 border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-brand text-center bg-white" placeholder="36" />
                              <button onClick={() => {
                                const newRules = [...fallbackSkuRules];
                                const rIdx = newRules.findIndex(r => r.id === rule.id);
                                newRules[rIdx].mappings = newRules[rIdx].mappings.filter((_: any, i: number) => i !== mIdx);
                                setFallbackSkuRules(newRules);
                              }} className="text-gray-400 hover:text-red-500 ml-auto"><X size={14}/></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
              <button 
                onClick={() => setFallbackSkuDrawer({isOpen: false, category: null})}
                className="px-5 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                关闭
              </button>
              <button 
                onClick={() => setFallbackSkuDrawer({isOpen: false, category: null})}
                className="px-5 py-2 text-sm font-medium bg-brand text-white rounded-md hover:bg-brand-hover transition-colors shadow-sm"
              >
                保存规则
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SF Monthly Bill Import Modal */}
      {importSfModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[640px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-red-600" size={20} />
                <h3 className="font-semibold text-lg text-gray-900">导入顺丰月度报关关税及运费账单</h3>
              </div>
              <button 
                onClick={() => setImportSfModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">选择对账月度 <span className="text-red-500">*</span></label>
                  <select 
                    value={sfImportMonth} 
                    onChange={e => setSfImportMonth(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-brand outline-none"
                  >
                    <option value="2026-07">2026年07月 (最新账单)</option>
                    <option value="2026-06">2026年06月</option>
                    <option value="2026-05">2026年05月</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">对账物流渠道</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="顺丰速运 - 跨境直邮模式" 
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Upload Drop Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">顺丰月度 Excel 表单文件 <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 hover:border-red-400 bg-gray-50/50 hover:bg-red-50/20 rounded-xl p-6 text-center cursor-pointer transition-colors group">
                  <Upload className="mx-auto text-gray-400 group-hover:text-red-500 mb-2 transition-colors" size={32} />
                  <div className="text-sm font-medium text-gray-800 mb-1">{importedFileName}</div>
                  <p className="text-xs text-gray-400">支持拖拽 .xlsx / .csv 文件，系统将自动基于订单号和运单号对账匹配</p>
                  <button 
                    onClick={() => setImportedFileName('已重选: SF_202607_Customs_Logistics_Monthly_Bill.xlsx')}
                    className="mt-3 inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded-md font-medium shadow-sm hover:bg-gray-50"
                  >
                    重新选择本地文件
                  </button>
                </div>
              </div>

              {/* Automatic Parsing Preview */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-xs space-y-2">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  解析准备就绪 (7 笔运单，匹配率 100%)
                </div>
                <div className="grid grid-cols-3 gap-2 text-emerald-900 pt-1">
                  <div>· 顺丰关税小计: <span className="font-mono font-bold">￥ 969.50</span></div>
                  <div>· 顺丰运费小计: <span className="font-mono font-bold">￥ 355.00</span></div>
                  <div>· 涉及商家数: <span className="font-mono font-bold">4 家</span></div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setImportSfModalOpen(false)} 
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-medium border border-gray-300 bg-white"
              >
                取消
              </button>
              <button 
                onClick={handleImportSfBillConfirm}
                className="px-5 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} /> 确认导入并核算对账
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Fund Top-up / Deduction Modal */}
      {manualFundModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[520px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/80">
              <div className="flex items-center gap-2">
                <Coins className="text-brand" size={20} />
                <h3 className="font-semibold text-lg text-gray-900">服务账户资金变更 / 关运费抵扣</h3>
              </div>
              <button 
                onClick={() => setManualFundModal(prev => ({ ...prev, isOpen: false }))} 
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">目标商家 <span className="text-red-500">*</span></label>
                <select 
                  value={manualFundModal.merchantId}
                  onChange={e => {
                    const mId = e.target.value;
                    const mName = serviceAccounts.find(s => s.merchantId === mId)?.merchantName || '';
                    setManualFundModal(prev => ({ ...prev, merchantId: mId, merchantName: mName }));
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-brand outline-none font-medium text-gray-800"
                >
                  {serviceAccounts.map(s => (
                    <option key={s.merchantId} value={s.merchantId}>
                      {s.merchantName} ({s.merchantId}) - 当前余额: HKD {s.accountBalance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">变更类型 <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-3">
                  {(['充值', '抵扣关运费', '手动调整'] as const).map(t => (
                    <button 
                      key={t}
                      type="button"
                      onClick={() => setManualFundModal(prev => ({ ...prev, type: t }))}
                      className={`py-2 rounded-lg border text-xs font-semibold transition-all ${manualFundModal.type === t ? 'border-brand bg-brand-light/20 text-brand shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">变更金额 <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    value={manualFundModal.amount} 
                    onChange={e => setManualFundModal(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="如: 5000.00"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-brand outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">币种</label>
                  <select 
                    value={manualFundModal.currency}
                    onChange={e => setManualFundModal(prev => ({ ...prev, currency: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-brand outline-none font-bold"
                  >
                    <option value="HKD">HKD (港币)</option>
                    <option value="CNY">CNY (人民币)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">业务备注说明</label>
                <textarea 
                  rows={3}
                  value={manualFundModal.remark}
                  onChange={e => setManualFundModal(prev => ({ ...prev, remark: e.target.value }))}
                  placeholder="请输入充值凭证号、转账流水或核算抵扣事由..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:border-brand outline-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setManualFundModal(prev => ({ ...prev, isOpen: false }))} 
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-medium border border-gray-300 bg-white"
              >
                取消
              </button>
              <button 
                onClick={handleManualFundSubmit}
                className="px-5 py-2 text-sm bg-brand text-white hover:bg-brand-hover rounded-lg font-medium transition-colors shadow-sm"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200 border border-gray-700">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
