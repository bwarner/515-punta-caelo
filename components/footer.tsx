export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrapper bg-driftwood w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-heading text-2xl font-bold text-white">Punta Caelo</h3>
            <p className="text-gray-200 text-center md:text-left">
              Your seaside retreat in San Carlos, Panama
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <h4 className="font-heading font-semibold text-white">Quick Links</h4>
              <div className="flex flex-col gap-1 text-sm">
                <a href="/en/rules" className="text-gray-300 hover:text-white transition-colors">House Rules</a>
                <a href="/en/wifi" className="text-gray-300 hover:text-white transition-colors">Wi-Fi Info</a>
                <a href="/en/faqs" className="text-gray-300 hover:text-white transition-colors">FAQs</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="font-heading font-semibold text-white">Explore</h4>
              <div className="flex flex-col gap-1 text-sm">
                <a href="/en/tips" className="text-gray-300 hover:text-white transition-colors">Local Tips</a>
                <a href="/en/todo" className="text-gray-300 hover:text-white transition-colors">Things To Do</a>
                <a href="/en/checkout" className="text-gray-300 hover:text-white transition-colors">Check Out</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-400 pt-4 mt-4 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Punta Caelo Vacation Rental • San Carlos, Panama
          </p>
        </div>
      </div>
    </footer>
  );
}
