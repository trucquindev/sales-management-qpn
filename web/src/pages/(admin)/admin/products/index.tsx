import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getAllCategoryAPI } from '@/apis';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}
interface category {
  name:string;
  image :string;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<category[]>([])
  const fetchData = async () => {
    try {
      const response = await getAllCategoryAPI();
      setCategory(response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData(); 
  }, []); 
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Coca Cola',
        price: 1.5,
        stock: 100,
        category: 'Beverages',
      },
      { id: 2, name: 'Pepsi', price: 1.5, stock: 80, category: 'Beverages' },
      { id: 3, name: 'Chips', price: 2, stock: 50, category: 'Snacks' },
      { id: 4, name: 'Chocolate Bar', price: 1, stock: 60, category: 'Snacks' },
      { id: 5, name: 'Bread', price: 2.5, stock: 30, category: 'Bakery' },
      { id: 6, name: 'Milk', price: 3, stock: 40, category: 'Dairy' },
    ];
    setProducts(mockProducts);

    const uniqueCategories = Array.from(
      new Set(mockProducts.map((p) => p.category))
    );
    setCategories(uniqueCategories);
  }, []);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id)) + 1,
    };
    setProducts([...products, newProduct]);
    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? product : p
    );
    setProducts(updatedProducts);
    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    const remainingCategories = Array.from(
      new Set(updatedProducts.map((p) => p.category))
    );
    setCategories(remainingCategories);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container p-4 flex justify-center w-full">
      <div className="w-2/4 p-1 mt-3">
        <ul className="px-4 py-1" style={{ marginTop: '40px' }}>
          <li
            className={`cursor-pointer p-2 hover:bg-gray-100 ${
              selectedCategory === null
                ? 'bg-gray-200 boder rounded-xl shadow-sm'
                : ''
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                selectedCategory === category
                  ? 'bg-gray-200 boder rounded-xl shadow-sm'
                  : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <div className="flex justify-between mt-0">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            style={{ marginRight: '20px' }}
          />
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                onSubmit={handleAddProduct}
                categories={categories}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mr-2"
                        onClick={() => setCurrentProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      {currentProduct && (
                        <ProductForm
                          onSubmit={handleEditProduct}
                          initialData={currentProduct}
                          categories={categories}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface ProductFormProps {
  onSubmit: any;
  initialData?: Product;
  categories: string[];
}

function ProductForm({ onSubmit, initialData, categories }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(
    initialData || { name: '', price: 0, stock: 0, category: '' }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <Input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        step="0.01"
        required
      />
      <Input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value="new">Add new category</option>
      </select>
      {formData.category === 'new' && (
        <Input
          type="text"
          name="newCategory"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          placeholder="New Category Name"
          required
        />
      )}
      <Button type="submit">{initialData ? 'Update' : 'Add'} Product</Button>
    </form>
  );
}
