/**
 * Google Apps Script for Wijha Academy Registration Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: WIJHAACADEMI
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire code
 * 5. Click Save (disk icon)
 * 6. Click Deploy > New deployment
 * 7. Select type: Web app
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Click Deploy
 * 11. Copy the Web app URL and use it in your HTML form
 */

// Main function to handle POST requests from the registration form
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Define headers - these will be created automatically if they don't exist
    const headers = [
      'التاريخ والوقت',
      'اسم الدورة',
      'الاسم الأول',
      'اسم العائلة',
      'رقم الهاتف',
      'واتساب',
      'البريد الإلكتروني',
      'طريقة الدفع'
    ];
    
    // Check if headers exist, if not create them
    const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const headersExist = firstRow.some(cell => cell !== '');
    
    if (!headersExist) {
      // Create headers
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#F48434'); // Orange color
      headerRange.setFontColor('#FFFFFF'); // White text
      headerRange.setHorizontalAlignment('center');
      
      // Set column widths
      sheet.setColumnWidth(1, 150); // Timestamp
      sheet.setColumnWidth(2, 200); // Course name
      sheet.setColumnWidth(3, 120); // First name
      sheet.setColumnWidth(4, 120); // Last name
      sheet.setColumnWidth(5, 130); // Phone
      sheet.setColumnWidth(6, 130); // WhatsApp
      sheet.setColumnWidth(7, 200); // Email
      sheet.setColumnWidth(8, 150); // Payment method
    }
    
    // Extract form data
    const timestamp = e.parameter.timestamp || new Date().toLocaleString('ar-TN');
    const courseName = e.parameter.courseName || 'بناء موقع احترافي بالذكاء الاصطناعي';
    const firstName = e.parameter.firstName || '';
    const lastName = e.parameter.lastName || '';
    const phone = e.parameter.phone || '';
    const whatsapp = e.parameter.whatsapp || '-';
    const email = e.parameter.email || '-';
    const paymentMethod = e.parameter.paymentMethod || '';
    
    // Create row data
    const rowData = [
      timestamp,
      courseName,
      firstName,
      lastName,
      phone,
      whatsapp,
      email,
      paymentMethod
    ];
    
    // Append the new row
    sheet.appendRow(rowData);
    
    // Format the new row (optional: add alternating colors)
    const lastRow = sheet.getLastRow();
    const newRowRange = sheet.getRange(lastRow, 1, 1, headers.length);
    
    // Add alternating row colors for better readability
    if (lastRow % 2 === 0) {
      newRowRange.setBackground('#FEF3E8'); // Light orange for even rows
    }
    
    // Center align all cells except email
    newRowRange.setHorizontalAlignment('center');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'تم التسجيل بنجاح',
        'row': lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (optional - for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Wijha Academy Registration API is running',
      'timestamp': new Date().toLocaleString('ar-TN')
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 * You can run this from the Apps Script editor to test
 */
function testSubmission() {
  const testData = {
    parameter: {
      timestamp: new Date().toLocaleString('ar-TN'),
      courseName: 'بناء موقع احترافي بالذكاء الاصطناعي',
      firstName: 'أحمد',
      lastName: 'التونسي',
      phone: '+216 12 345 678',
      whatsapp: '+216 12 345 678',
      email: 'test@example.com',
      paymentMethod: 'D17'
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
