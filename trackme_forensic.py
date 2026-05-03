import trackingmore
from trackingmore.exception import TrackingMoreException
import json

trackingmore.api_key = 's6aj0wiw-wxq3-imka-lp7b-n6c6zucsxm72'

tracking_number = 'EB857098057CN'

for courier in ['china-post', 'china-ems']:
    print(f"\n{'='*70}")
    print(f"🔍 DETAILED CHECK FOR COURIER: {courier.upper()}")
    print(f"{'='*70}")
    
    params = {
        'tracking_number': tracking_number,
        'courier_code': courier,
        'lang': 'en'
    }
    
    try:
        # Create / update tracking record
        create_result = trackingmore.tracking.create_tracking(params)
        print("Create Result:")
        print(json.dumps(create_result, indent=2, ensure_ascii=False))
        
        # Get full detailed tracking
        result = trackingmore.tracking.get_tracking_results(params)
        print("\nFull Detailed Tracking:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        
    except TrackingMoreException as e:
        print("❌ TrackingMore Error:", e)
    except Exception as e:
        print("❌ Error:", e)
