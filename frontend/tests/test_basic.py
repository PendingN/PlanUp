import pytest
from playwright.sync_api import Page, expect

def test_basic_page_load(page: Page):
    # Navigate to the local web application at http://127.0.0.1:3000
    page.goto("http://127.0.0.1:3000")
    
    # Wait for the page load state
    page.wait_for_load_state("domcontentloaded")
    
    # Check title or print the title
    title = page.title()
    try:
        print(f"\nPage title: {title}")
    except UnicodeEncodeError:
        print(f"\nPage title (bytes): {title.encode('utf-8')}")
    
    # Verify the page contains something or loads successfully
    assert title is not None
    assert "PlanUp" in title
    
    # Let's inspect the page content/body element
    body = page.locator("body")
    expect(body).to_be_visible()
    
    content = page.content()
    print(f"Page content length: {len(content)}")
