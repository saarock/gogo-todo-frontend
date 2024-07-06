class ProductUtil {
    
    public getCurrentProductName():string {
        const projectNameFromPath =window.location.pathname.trim();
        const projectName = projectNameFromPath.split("/").pop();
        if (projectName) {
            const currentProductName = projectName.replace(/%20/g, ' '); // Replace %20 with spaces
        
            return currentProductName.toLowerCase().trim(); // Return the product name in lowercase and trimmed
        } 
        
        return ""; // Return an empty string if projectName is null or undefined
    }
}

const productUtil = new ProductUtil();
export default productUtil;