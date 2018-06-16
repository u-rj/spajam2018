//
//  ShareViewController.swift
//  ShareExtension
//
//  Created by 大畑僚樹 on 2018/02/25.
//

import UIKit
import Social
import MobileCoreServices

var ActivityIndicator: UIActivityIndicatorView!


class ShareViewController: SLComposeServiceViewController {
        override func isContentValid() -> Bool {
            return true
        }
    
        override func didSelectPost() {
            
            func alert (_ title: String = "", _ message: String = "", buttonText: String = "OK") -> Void {
                let alert:UIAlertController = UIAlertController(title:title,
                                                                message: message,
                                                                preferredStyle: UIAlertControllerStyle.alert)
                let defaultAction:UIAlertAction = UIAlertAction(title: buttonText,
                                                                style: UIAlertActionStyle.default,
                                                                handler:{
                                                                    (action:UIAlertAction!) -> Void in
                })
                alert.addAction(defaultAction)
                present(alert, animated: true, completion: nil)
            }
            
            func errorAlert(_ message: String, _ dumpData: [Any?] = []) -> Void {
                var messageText = message
                for value in dumpData {
                    var dumped = String()
                    dump(value, to: &dumped)
                    messageText += ":" + dumped
                }
                
                let alert:UIAlertController = UIAlertController(title:"Error",
                                                                message: messageText,
                                                                preferredStyle: UIAlertControllerStyle.alert)
                let defaultAction:UIAlertAction = UIAlertAction(title: "OK",
                                                                style: UIAlertActionStyle.default,
                                                                handler:{
                                                                    (action:UIAlertAction!) -> Void in
                                                                    self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                })
                alert.addAction(defaultAction)
                present(alert, animated: true, completion: nil)
                
                endLoading()
            }
            func debugAlert(_ dumpData: [Any?] = []) -> Void {
                var messageText = ""
                for value in dumpData {
                    var dumped = String()
                    dump(value, to: &dumped)
                    messageText += ":" + dumped
                }
                
                alert("Debug", messageText)
            }
            
            func startLoading() -> Void {
                ActivityIndicator.startAnimating()
            }
            
            func endLoading() -> Void {
                ActivityIndicator.stopAnimating()
            }
            
            func getAppGroupData(_ key: String) -> String {
                let userDefaults = UserDefaults(suiteName: "group.jp.starmine.starmine")
                let data = userDefaults?.string(forKey: key)
                if (data != nil) {
                    return data!
                }
                return ""
            }
            
            func getEnv () -> String {
                let apiMode = getAppGroupData("api_mode")
                if (apiMode != "") {
                  return apiMode
                }
                return "dev"
                // print(Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as! String)
                // print(Int(Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as! String)!)
                /*
                let version = 1000
                if (version / 1000 == 2) {
                    return "tst"
                } else if (version / 1000 == 1) {
                    return "dev"
                } else {
                    return "pro"
                }
 */
            }
            
            func api(url: String, method: String, data: Any = [], success: @escaping (Any) -> Void) -> Void {
                var request =  URLRequest(url: URL(string: url)!)
                var requestText = ""
                request.httpMethod = method
                
                if (method != "GET" && method != "get") {
                    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                    // request.setValue("\(data.count)", forHTTPHeaderField: "Content-Length")
                    do {
                        request.httpBody = try JSONSerialization.data(withJSONObject: data, options: .prettyPrinted)
                        requestText = String(bytes: try JSONSerialization.data(withJSONObject: data, options: .prettyPrinted), encoding: .utf8)!
                    } catch {
                        errorAlert("Api parameter stringify error")
                        return
                    }
                }
    
                URLSession.shared.dataTask(with: request) { (data, response, error) in
                    guard let data = data else {
                        errorAlert("Api request data is nil")
                        return
                    }
                    
                    do {
                        // dump(response)
                        // dump(try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.allowFragments))
                        let object = try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.allowFragments) as! [String: Any]
                        let status = object["status"] as! [String: String]
                        if (status["type"] == "failure") {
                            errorAlert("Api request failure")
                            return
                        }
                        let result = object["result"]
                        /*
                         print(object)
                         let result = object["result"] as! [String: String]
                         print(result["user_id"]!)
                         */
                        success(result as Any)
                    } catch {
                        errorAlert("Api request json parse error: " + requestText, [response])
                    }
                    
                    // guard let data = data else { return }
                    // let json = try? JSONDecoder().decode(from: data)
                    }.resume()
            }
            
            
            func tagAlert () -> Void {
                print("!!!33")
                
                let alert:UIAlertController = UIAlertController(title:"",
                                                                message: "保存完了！ タグを編集しますか?",
                                                                preferredStyle: UIAlertControllerStyle.alert)
                let defaultAction:UIAlertAction = UIAlertAction(title: "編集する",
                                                                style: UIAlertActionStyle.default,
                                                                handler:{
                                                                    (action:UIAlertAction!) -> Void in
                                                                    self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                                                                    print("!!!4")
                                                                    
                })
                let cancelAction:UIAlertAction = UIAlertAction(title: "編集しない",
                                                               style: UIAlertActionStyle.cancel,
                                                               handler:{
                                                                (action:UIAlertAction!) -> Void in
                                                                self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                                                                print("!!!5")
                })
                
                alert.addAction(defaultAction)
                alert.addAction(cancelAction)
                // present(alert, animated: true, completion: nil)
                
                self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                /*
                 let alert: UIAlertController = UIAlertController(title: "", message: "保存完了！ タグを編集しますか?", preferredStyle:  UIAlertControllerStyle.alert)
                 let defaultAction: UIAlertAction = UIAlertAction(title: "編集する", style: UIAlertActionStyle.default, handler:{
                 (action: UIAlertAction!) -> Void in
                 alert("OK tapped")
                 let url = URL(string: "starmine://tag-edit/10000")!
                 if UIApplication.shared.canOpenURL(url) {
                 UIApplication.shared.open(url, options: [:], completionHandler: { (success) in
                 // success
                 })
                 self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                 })
                 let cancelAction: UIAlertAction = UIAlertAction(title: "編集しない", style: UIAlertActionStyle.cancel, handler:{
                 (action: UIAlertAction!) -> Void in
                 self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                 })
                 
                 alert.addAction(cancelAction)
                 alert.addAction(defaultAction)
                 present(alert, animated: true, completion: nil)
                 }
                 */
            }
            
            
            func sendShareData(_ shareData:Array<Any>) -> Void {
                if (shareData.count == 0) {
                    errorAlert("Share content is empty")
                    return
                }
                
                /*
                let loginUserId = getAppGroupData("login_user_id")
                if loginUserId == "" {
                    errorAlert("App group login_user_id is not found")
                    return
                }
                
                let loginPassword = getAppGroupData("login_password")
                if loginUserId == "" {
                    errorAlert("App group login_password is not found")
                    return
                }
                */
                
                let code = getAppGroupData("code")
                if code == "" {
                    errorAlert("ログインが完了しておりません。ログインしてから再度実行してください。")
                    return
                }
                
                print(getEnv())
                api(url: "https://front-dot-starmine-" + getEnv() + ".appspot.com/api/token?code=" + code, method: "GET", data: [], success: { data in
                    // let loginData = data as! [String: String]
                    // dump(loginData["fb_id"])
                    print("!!!2")
                    api(url: "https://front-dot-starmine-" + getEnv() + ".appspot.com/api/content/upload", method: "POST", data: ["content": shareData], success: { data in
                        print("!!!3")
                        print(data)
                        endLoading()
                        tagAlert()
                    })
                })
            }
            
            
            func main() -> Void {
                startLoading()
                var shareData = [] as [Any]
                
                let extensionItem: NSExtensionItem = self.extensionContext?.inputItems.first as! NSExtensionItem
                var now = 0
                var total = 0
                func finish () -> Void {
                    now += 1
                    if (now >= total) {
                        sendShareData(shareData)
                    }
                }
                
                for ele in extensionItem.attachments!{
                    total += 1
                    let itemProvider = ele as! NSItemProvider
                    let puclicURL = String(kUTTypeURL)
                    let puclicImage = String(kUTTypeImage)
                    let puclicPlainText = String(kUTTypePlainText)
                    
                    if itemProvider.hasItemConformingToTypeIdentifier(puclicURL) {
                        itemProvider.loadItem(forTypeIdentifier: puclicURL, options: nil, completionHandler: { (item, error) in
                            if let url: NSURL = item as? NSURL {
                                shareData.append([
                                    "url": url.absoluteString!
                                    ])
                                finish()
                            } else {
                                errorAlert("Share url is valid")
                            }
                        })
                        
                        /* サムネイル取得
                         itemProvider.loadPreviewImage(options: nil, completionHandler: { (item, error) in
                         if let image = item as? UIImage {
                         print("thumbnail")
                         let data:NSData = UIImagePNGRepresentation(image)! as NSData
                         print(data.base64EncodedString())
                         // self.tagAlert()
                         }
                         })
                         */
                    } else if itemProvider.hasItemConformingToTypeIdentifier(puclicImage) {
                        itemProvider.loadItem(forTypeIdentifier: puclicImage, options: nil, completionHandler: { (item, error) in
                            if let url: NSURL = item as? NSURL {
                                do {
                                    let data = try NSData(contentsOf: url as URL) as NSData
                                    shareData.append([
                                        "image": data.base64EncodedString()
                                        ])
                                    finish()
                                } catch {
                                    errorAlert("Share image is invalid")
                                }
                            } else {
                                errorAlert("Share image is invalid")
                            }
                        })
                    } else if itemProvider.hasItemConformingToTypeIdentifier(puclicPlainText) {
                        itemProvider.loadItem(forTypeIdentifier: puclicPlainText, options: nil, completionHandler: { (item, error) in
                            shareData.append([
                                "url": item!
                                ])
                            finish()
                            /*
                            if let url: NSURL = item as? NSURL {
                                shareData.append([
                                    "url": item!
                                    ])
                                finish()
                            } else {
                                errorAlert("Share url is valid")
                            }
 */
                        })
                    } else {
                        errorAlert("No support share content type")
                    }
                }
            }
            
            main()
        }

        override func configurationItems() -> [Any]! {
            // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
  
            return []
        }
    
        override func viewDidLoad() {
            //super.viewDidLoad()
            // ActivityIndicatorを作成＆中央に配置
            //ActivityIndicator = UIActivityIndicatorView()
            //ActivityIndicator.frame = CGRect(x: 0, y: 0, width: 50, height: 50)
            // ActivityIndicator.center = self.view.center
            
            // クルクルをストップした時に非表示する
            //ActivityIndicator.hidesWhenStopped = true
            
            // 色を設定
            //ActivityIndicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.gray
            
            //Viewに追加
            // self.view.addSubview(ActivityIndicator)
            //navigationItem.rightBarButtonItem!.title = "保存"
            
            super.viewDidLoad()
            self.view.backgroundColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
            
            // ActivityIndicatorを作成＆中央に配置
            ActivityIndicator = UIActivityIndicatorView()
            ActivityIndicator.frame = CGRect(x: 0, y: 0, width: 50, height: 50)
            ActivityIndicator.center = self.view.center
            
            // クルクルをストップした時に非表示する
            ActivityIndicator.hidesWhenStopped = true
            
            // 色を設定
            ActivityIndicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.white
            
            //Viewに追加
            self.view.addSubview(ActivityIndicator)
            
        }
}


