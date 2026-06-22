'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Lock,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Product, Category, Size, Color } from '@/types';

const STORAGE_KEY = 'athar_products';
const AUTH_KEY = 'athar_admin_auth';
const ADMIN_EMAIL = 'aymanmahmoud123@ayman.com';
const ADMIN_PASSWORD = 'ayman1123';

const sizeOptions: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const categoryOptions: { id: Category; name: string; nameAr: string }[] = [
  { id: 'men', name: 'Men', nameAr: 'رجالي' },
  { id: 'women', name: 'Women', nameAr: 'نسائي' },
  { id: 'hoodies', name: 'Hoodies', nameAr: 'هوديز' },
  { id: 't-shirts', name: 'T-Shirts', nameAr: 'تيشيرتات' },
  { id: 'jeans', name: 'Jeans', nameAr: 'جينز' },
  { id: 'jackets', name: 'Jackets', nameAr: 'جاكيتات' },
  { id: 'shoes', name: 'Shoes', nameAr: 'أحذية' },
  { id: 'accessories', name: 'Accessories', nameAr: 'إكسسوارات' },
  { id: 'dresses', name: 'Dresses', nameAr: 'فساتين' },
  { id: 'sweaters', name: 'Sweaters', nameAr: 'سويترات' },
  { id: 'shorts', name: 'Shorts', nameAr: 'شورتات' },
  { id: 'skirts', name: 'Skirts', nameAr: 'تنيرات' },
];

const defaultProduct: Partial<Product> = {
  name: '',
  nameAr: '',
  description: '',
  descriptionAr: '',
  price: 0,
  salePrice: undefined,
  currency: 'EGP',
  images: [],
  videos: [],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: [{ name: 'Black', hex: '#000000' }],
  materials: ['Cotton'],
  category: 't-shirts',
  featured: false,
  newArrival: false,
  bestSeller: false,
  trending: false,
  rating: 4.5,
  reviewCount: 0,
  viewCount: 0,
  stock: 50,
  sku: '',
  shippingInfo: 'Free shipping on orders over 500 EGP. Delivery takes 2-5 business days within Egypt.',
  returnPolicy: '30-day return policy. Items must be unworn with original tags.',
  tags: [],
};

function generateId() {
  return 'product-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function generateSku(name: string) {
  return 'SKU-' + name.slice(0, 3).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(defaultProduct);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load products from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  const loadProducts = async () => {
    setLoading(true);
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored products:', e);
      }
    }

    // Load from JSON file
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      if (data.products) {
        setProducts(data.products);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
      }
    } catch (e) {
      console.error('Error loading products:', e);
    }

    setLoading(false);
  };

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameAr.includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Open dialog for add/edit
  const openDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        ...defaultProduct,
        id: generateId(),
        slug: '',
        sku: generateSku('new'),
        createdAt: new Date().toISOString().split('T')[0],
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData(defaultProduct);
    setImageUrlInput('');
  };

  // Convert file to base64 (stores in localStorage with products)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file input change
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file);
        const newImage = {
          id: 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          src: base64,
          alt: formData.name || 'Product image',
        };
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), newImage],
        }));
        toast.success('Image added');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to process image');
    } finally {
      setUploadingImage(false);
    }
    e.target.value = '';
  };

  // Add image from URL
  const addImageFromUrl = () => {
    if (!imageUrlInput.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    const newImage = {
      id: 'img-' + Date.now(),
      src: imageUrlInput.trim(),
      alt: formData.name || 'Product image',
    };

    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), newImage],
    }));

    setImageUrlInput('');
    toast.success('Image added');
  };

  // Remove image
  const removeImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter(img => img.id !== imageId),
    }));
  };

  // Toggle size
  const toggleSize = (size: Size) => {
    setFormData(prev => {
      const sizes = prev.sizes || [];
      if (sizes.includes(size)) {
        return { ...prev, sizes: sizes.filter(s => s !== size) };
      } else {
        return { ...prev, sizes: [...sizes, size] };
      }
    });
  };

  // Add color
  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...(prev.colors || []), { name: 'Color', hex: '#000000' }],
    }));
  };

  // Remove color
  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: (prev.colors || []).filter((_, i) => i !== index),
    }));
  };

  // Update color
  const updateColor = (index: number, field: 'name' | 'hex', value: string) => {
    setFormData(prev => {
      const colors = [...(prev.colors || [])];
      colors[index] = { ...colors[index], [field]: value };
      return { ...prev, colors };
    });
  };

  // Save product
  const saveProduct = () => {
    if (!formData.name?.trim()) {
      toast.error('Product name is required');
      return;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error('Valid price is required');
      return;
    }

    if ((formData.images || []).length === 0) {
      toast.error('At least one image is required');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || formData.id || generateId(),
      slug: editingProduct?.slug || slugify(formData.name || ''),
      name: formData.name || '',
      nameAr: formData.nameAr || formData.name || '',
      description: formData.description || '',
      descriptionAr: formData.descriptionAr || formData.description || '',
      price: formData.price || 0,
      salePrice: formData.salePrice || undefined,
      currency: formData.currency || 'EGP',
      images: formData.images || [],
      videos: formData.videos || [],
      sizes: formData.sizes || ['M', 'L'],
      colors: formData.colors || [{ name: 'Black', hex: '#000000' }],
      materials: formData.materials || ['Cotton'],
      category: formData.category || 't-shirts',
      featured: formData.featured || false,
      newArrival: formData.newArrival || false,
      bestSeller: formData.bestSeller || false,
      trending: formData.trending || false,
      rating: formData.rating || 4.5,
      reviewCount: formData.reviewCount || 0,
      reviews: editingProduct?.reviews || [],
      viewCount: formData.viewCount || 0,
      stock: formData.stock || 0,
      sku: formData.sku || generateSku(formData.name || ''),
      shippingInfo: formData.shippingInfo || '',
      returnPolicy: formData.returnPolicy || '',
      tags: formData.tags || [],
      createdAt: formData.createdAt || new Date().toISOString().split('T')[0],
    };

    if (editingProduct) {
      saveProducts(products.map(p => p.id === editingProduct.id ? productData : p));
      toast.success('Product updated successfully');
    } else {
      saveProducts([...products, productData]);
      toast.success('Product added successfully');
    }

    closeDialog();
  };

  // Delete product
  const deleteProduct = () => {
    if (productToDelete) {
      saveProducts(products.filter(p => p.id !== productToDelete));
      toast.success('Product deleted');
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Reset to default
  const resetToDefault = async () => {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      if (data.products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
        setProducts(data.products);
        toast.success('Products reset to default');
      }
    } catch (e) {
      toast.error('Failed to reset products');
    }
  };

  // Login form for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600 mt-1">
                Manage your products ({products.length} total)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button variant="outline" onClick={resetToDefault}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={() => openDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
              />
            </div>
            <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v as Category | 'all')}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Product</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map(product => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0].src}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 capitalize">{product.category}</td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium">{product.price} EGP</span>
                          {product.salePrice && (
                            <span className="text-sm text-red-500 ml-2 line-through">{product.salePrice}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 20 ? 'bg-green-100 text-green-700' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1 flex-wrap">
                          {product.featured && (
                            <span className="px-2 py-0.5 bg-black text-white text-xs rounded">Featured</span>
                          )}
                          {product.newArrival && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">New</span>
                          )}
                          {product.bestSeller && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">Best Seller</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog(product)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => {
                              setProductToDelete(product.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Name (English)</Label>
                <Input
                  value={formData.name || ''}
                  onChange={e => setFormData(p => ({
                    ...p,
                    name: e.target.value,
                    slug: editingProduct?.slug || slugify(e.target.value),
                  }))}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label>Name (Arabic)</Label>
                <Input
                  value={formData.nameAr || ''}
                  onChange={e => setFormData(p => ({ ...p, nameAr: e.target.value }))}
                  placeholder="اسم المنتج"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Description (English)</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              <div>
                <Label>Description (Arabic)</Label>
                <Textarea
                  value={formData.descriptionAr || ''}
                  onChange={e => setFormData(p => ({ ...p, descriptionAr: e.target.value }))}
                  placeholder="وصف المنتج"
                  dir="rtl"
                  rows={3}
                />
              </div>
            </div>

            {/* Price & Category */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Price (EGP)</Label>
                <Input
                  type="number"
                  value={formData.price || ''}
                  onChange={e => setFormData(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Sale Price (optional)</Label>
                <Input
                  type="number"
                  value={formData.salePrice || ''}
                  onChange={e => setFormData(p => ({ ...p, salePrice: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  placeholder="Leave empty for no sale"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData(p => ({ ...p, category: v as Category }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stock & SKU */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  value={formData.stock || ''}
                  onChange={e => setFormData(p => ({ ...p, stock: parseInt(e.target.value) || 0 }))}
                  placeholder="50"
                />
              </div>
              <div>
                <Label>SKU</Label>
                <Input
                  value={formData.sku || ''}
                  onChange={e => setFormData(p => ({ ...p, sku: e.target.value }))}
                  placeholder="SKU-XXXX"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Label>Available Sizes</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizeOptions.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      (formData.sizes || []).includes(size)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Colors</Label>
                <Button type="button" variant="outline" size="sm" onClick={addColor}>
                  <Plus className="w-4 h-4 mr-1" /> Add Color
                </Button>
              </div>
              <div className="space-y-2">
                {(formData.colors || []).map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={e => updateColor(index, 'hex', e.target.value)}
                      className="w-10 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={color.name}
                      onChange={e => updateColor(index, 'name', e.target.value)}
                      placeholder="Color name"
                      className="flex-1"
                    />
                    {(formData.colors?.length || 0) > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeColor(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <Label>Product Images</Label>
              <div className="mt-2 space-y-3">
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`cursor-pointer flex flex-col items-center ${uploadingImage ? 'opacity-50' : ''}`}
                  >
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploadingImage ? 'Uploading...' : 'Click to upload images or drag and drop'}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 10MB</span>
                  </label>
                </div>

                {/* URL Input */}
                <div className="text-center text-sm text-gray-500">or</div>
                <div className="flex gap-2">
                  <Input
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    placeholder="Paste image URL here..."
                    className="flex-1"
                  />
                  <Button type="button" onClick={addImageFromUrl}>
                    <ImageIcon className="w-4 h-4 mr-1" /> Add URL
                  </Button>
                </div>

                {/* Image Preview */}
                {(formData.images || []).length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images?.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Toggles */}
            <div>
              <Label>Product Status</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.featured || false}
                    onCheckedChange={(checked) => setFormData(p => ({ ...p, featured: !!checked }))}
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.newArrival || false}
                    onCheckedChange={(checked) => setFormData(p => ({ ...p, newArrival: !!checked }))}
                  />
                  <span className="text-sm">New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.bestSeller || false}
                    onCheckedChange={(checked) => setFormData(p => ({ ...p, bestSeller: !!checked }))}
                  />
                  <span className="text-sm">Best Seller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.trending || false}
                    onCheckedChange={(checked) => setFormData(p => ({ ...p, trending: !!checked }))}
                  />
                  <span className="text-sm">Trending</span>
                </label>
              </div>
            </div>

            {/* Materials */}
            <div>
              <Label>Materials (comma separated)</Label>
              <Input
                value={(formData.materials || []).join(', ')}
                onChange={e => setFormData(p => ({
                  ...p,
                  materials: e.target.value.split(',').map(m => m.trim()).filter(Boolean),
                }))}
                placeholder="Cotton, Polyester, Elastane"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={saveProduct}>
              <Save className="w-4 h-4 mr-2" />
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
