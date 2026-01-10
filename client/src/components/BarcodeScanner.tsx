/*
 * KHORA Barcode Scanner Component
 * Scanează coduri de bare folosind camera și caută produse în Open Food Facts
 */

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Search, AlertCircle, Check, Loader2 } from "lucide-react";

interface ScannedProduct {
  barcode: string;
  name: string;
  brand?: string;
  category?: string;
  image?: string;
  nutrients?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
}

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: ScannedProduct) => void;
}

export default function BarcodeScanner({ isOpen, onClose, onProductFound }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null);
  const [manualBarcode, setManualBarcode] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !scanning) {
      startScanner();
    }
    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const startScanner = async () => {
    try {
      setError(null);
      setScanning(true);
      
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!document.getElementById("barcode-reader")) {
        setError("Scanner container not found");
        setScanning(false);
        return;
      }

      scannerRef.current = new Html5Qrcode("barcode-reader");
      
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.777778
        },
        onScanSuccess,
        () => {} // Ignore scan failures
      );
    } catch (err: any) {
      console.error("Scanner error:", err);
      setError(err.message || "Nu s-a putut accesa camera. Verifică permisiunile.");
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const onScanSuccess = async (decodedText: string) => {
    // Stop scanner immediately after successful scan
    await stopScanner();
    await lookupProduct(decodedText);
  };

  const lookupProduct = async (barcode: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use Open Food Facts API
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        const product = data.product;
        const scanned: ScannedProduct = {
          barcode,
          name: product.product_name || product.product_name_ro || "Produs necunoscut",
          brand: product.brands,
          category: product.categories_tags?.[0]?.replace("en:", "").replace(/-/g, " "),
          image: product.image_front_small_url || product.image_url,
          nutrients: {
            calories: product.nutriments?.["energy-kcal_100g"],
            protein: product.nutriments?.proteins_100g,
            carbs: product.nutriments?.carbohydrates_100g,
            fat: product.nutriments?.fat_100g,
            fiber: product.nutriments?.fiber_100g
          }
        };
        setScannedProduct(scanned);
      } else {
        setError(`Produsul cu codul ${barcode} nu a fost găsit în baza de date.`);
      }
    } catch (err) {
      setError("Eroare la căutarea produsului. Verifică conexiunea la internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = () => {
    if (manualBarcode.length >= 8) {
      lookupProduct(manualBarcode);
    }
  };

  const handleAddProduct = () => {
    if (scannedProduct) {
      onProductFound(scannedProduct);
      handleClose();
    }
  };

  const handleClose = () => {
    stopScanner();
    setScannedProduct(null);
    setError(null);
    setManualBarcode("");
    onClose();
  };

  const handleRescan = () => {
    setScannedProduct(null);
    setError(null);
    startScanner();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(10, 22, 40, 0.95)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-[#2dd4bf]" />
              <h2 className="text-white font-medium">Scanează Cod de Bare</h2>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {!scannedProduct && !loading && (
              <>
                {/* Scanner View */}
                <div 
                  id="barcode-reader" 
                  ref={containerRef}
                  className="w-full h-48 rounded-xl overflow-hidden bg-black/50 mb-4"
                />
                
                {/* Manual Input */}
                <div className="mb-4">
                  <p className="text-white/50 text-xs mb-2">Sau introdu codul manual:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualBarcode}
                      onChange={(e) => setManualBarcode(e.target.value)}
                      placeholder="Ex: 5941234567890"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#2dd4bf]/50"
                    />
                    <button
                      onClick={handleManualSearch}
                      disabled={manualBarcode.length < 8}
                      className="px-4 py-3 rounded-xl bg-[#2dd4bf]/20 text-[#2dd4bf] disabled:opacity-50"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </>
            )}

            {/* Loading */}
            {loading && (
              <div className="py-12 text-center">
                <Loader2 className="w-8 h-8 text-[#2dd4bf] animate-spin mx-auto mb-3" />
                <p className="text-white/60">Se caută produsul...</p>
              </div>
            )}

            {/* Product Found */}
            {scannedProduct && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {scannedProduct.image && (
                    <img 
                      src={scannedProduct.image} 
                      alt={scannedProduct.name}
                      className="w-20 h-20 rounded-xl object-cover bg-white/10"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{scannedProduct.name}</h3>
                    {scannedProduct.brand && (
                      <p className="text-white/50 text-sm">{scannedProduct.brand}</p>
                    )}
                    {scannedProduct.category && (
                      <p className="text-[#2dd4bf] text-xs mt-1 capitalize">{scannedProduct.category}</p>
                    )}
                  </div>
                </div>

                {/* Nutrients */}
                {scannedProduct.nutrients && (
                  <div className="grid grid-cols-5 gap-2">
                    {scannedProduct.nutrients.calories && (
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <p className="text-white font-medium text-sm">{Math.round(scannedProduct.nutrients.calories)}</p>
                        <p className="text-white/40 text-xs">kcal</p>
                      </div>
                    )}
                    {scannedProduct.nutrients.protein && (
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <p className="text-white font-medium text-sm">{scannedProduct.nutrients.protein.toFixed(1)}g</p>
                        <p className="text-white/40 text-xs">prot</p>
                      </div>
                    )}
                    {scannedProduct.nutrients.carbs && (
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <p className="text-white font-medium text-sm">{scannedProduct.nutrients.carbs.toFixed(1)}g</p>
                        <p className="text-white/40 text-xs">carb</p>
                      </div>
                    )}
                    {scannedProduct.nutrients.fat && (
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <p className="text-white font-medium text-sm">{scannedProduct.nutrients.fat.toFixed(1)}g</p>
                        <p className="text-white/40 text-xs">fat</p>
                      </div>
                    )}
                    {scannedProduct.nutrients.fiber && (
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <p className="text-white font-medium text-sm">{scannedProduct.nutrients.fiber.toFixed(1)}g</p>
                        <p className="text-white/40 text-xs">fibre</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleRescan}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm"
                  >
                    Scanează alt produs
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #2dd4bf, #22c55e)' }}
                  >
                    <Check className="w-4 h-4" />
                    Adaugă în Cămară
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer tip */}
          {!scannedProduct && !loading && (
            <div className="px-4 pb-4">
              <p className="text-white/30 text-xs text-center">
                Îndreaptă camera spre codul de bare al produsului
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
