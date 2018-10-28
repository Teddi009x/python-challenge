import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import requests
import time

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

def scrape_mars():
    results = {}

    # Initialize browser
    browser = init_browser()

    url = 'https://mars.nasa.gov/news/'
    browser.visit(url)

    # Extract title text
    html = browser.html
    soup = bs(html, 'html.parser') 
    
    # news_title = soup.title.text
    results["news_title"] = soup.find('div',{'class':'content_title'}).text

    # Extract title text
    html = browser.html
    soup = bs(html, 'html.parser') 
    
    # news_p = soup.title.text
    results["news_p"] = soup.find('div',{'class':'rollover_description_inner'}).text


# Finding Mars featured image

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=feature&category=Mars#submit'
    browser.visit(url)

    browser.find_by_xpath('//*[@id="full_image"]').click()

    time.sleep(3)

    # Extract title text
    html = browser.html
    soup = bs(html, 'html.parser') 

    imgs = soup.find("img",{"class":"fancybox-image"})['src']
    results["mar_imgs"] = "https://www.jpl.nasa.gov/space" +imgs


# Finding Weather conditions on Mars from twitter

    twit_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(twit_url)

    # Extract title text
    html = browser.html
    soup = bs(html, 'html.parser') 

    results["twt_title"] = soup.find('div',{'class':'js-tweet-text-container'}).text


# Finding Mars Facts

    fact_url = 'http://space-facts.com/mars'
    browser.visit(fact_url)

    # Extract title text
    html = browser.html
    soup = bs(html, 'html.parser') 

    # need to pull table using for loop
    # using:  DataFrame.to_html

    # Print all paragraph texts

    table_df = pd.read_html('http://space-facts.com/mars')
    table_df = table_df[0]
  
    table_df.columns = ['0', '1']
    table_df = table_df.rename(columns={'0': 'Description', '1': 'Values'}) 

    results["table_df"] = table_df.to_html()
   

# Finding Mars Hemisphere images

    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)

    # Locate and capture the titles and links

    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    response_hemi = requests.get(url)
    soup = bs(response_hemi.text, 'html.parser') 

    ilinks = soup.find_all("a",class_="itemLink product-item")
    titles= []
    links = []
    for ilink in ilinks:
        title= ilink.find("h3").text
        link = ilink["href"]
        titles.append(title)
        links.append(link)
    
    print(titles)
    print(links)

    # Loop through returned urls with titles 

    browser.visit(url)
    hemi_img_urls = []
    mars_look =[]
    for i in range(len(titles)):
        try:
            browser.click_link_by_partial_text(titles[i])
        except:
            browser.find_link_by_text('2').first.click()
            browser.click_link_by_partial_text(titles[i])
        html = browser.html
        soup1 = bs(html, 'html.parser')

        hemi_downloads = soup1.find('div', 'downloads')
        print(titles[i], '-----------')
        hemi_url = hemi_downloads.a['href']
        print(hemi_url)
        hemi_dict = {"title": titles[i], 'img_url':hemi_url}
        hemi_img_urls.append(hemi_dict)
    
    results["hemi_img_urls"]= hemi_img_urls

   
    return results

