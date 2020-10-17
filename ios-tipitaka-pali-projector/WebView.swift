//
//  WebView.swift
//  ios-tipitaka-pali-projector
//
//  Created by Arthur Damm on 10/16/20.
//

import Foundation
import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        
    }
    
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        let folder = "tipitaka_projector_data"
        let resourcePath = Bundle.main.resourcePath
        let subdir = URL(fileURLWithPath:resourcePath!).appendingPathComponent(folder, isDirectory: true)
        guard let path = Bundle.main.path(forResource: "index", ofType: "htm", inDirectory: folder) else {
            print("TPP ASSET LOAD FAILED!")
            return webView
        }
        print("TPP PATH:")
        print(subdir.path)
        let url = NSURL.fileURL(withPath: path)
        print(url.path)
        webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        webView.configuration.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        webView.loadFileURL(url, allowingReadAccessTo: subdir)
        return webView
    }
}

